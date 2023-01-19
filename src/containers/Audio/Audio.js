import React, { useLayoutEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import { mediaLoading, mediaLoaded, mediaError } from '../../actions/canvas';

import { setCurrentTime, finishedPlaying, seek } from '../../actions/viewState';

// Media Element
import 'mediaelement/standalone';
import useEventListener from '../../hooks/useEventListener';
import useInterval from '../../hooks/useInterval';
import { ERROR_CODES } from '../../constants/canvas';

const { MediaElement } = window;

function Audio({ url, volume, currentTime, startTime, isPlaying, ...props }) {
  const audio = useRef();
  const player = useRef();
  const [duration, setDuration] = useState();
  const [loaded, setLoaded] = useState();
  const sources = [{ src: url }];
  const lastTime = useRef(() => startTime - 1);

  // Bootstrap the element.
  useLayoutEffect(() => {
    const element = new MediaElement(
      audio.current,
      {
        startVolume: volume / 100,
        currentTime: currentTime / 1000,
      },
      sources
    );
    player.current = element;
    setLoaded(false);
    return () => {
      element.remove();
    };
  }, []);

  useEventListener(player, 'error', event => {
    if (event && event.type === 'error') {
      // This will need to be refined.
      props.mediaError('error', ERROR_CODES.MEDIA_ERR_NETWORK);
    }
  });

  // Loop timer for calculating current time.
  useInterval(
    () => {
      const position = player.current.getCurrentTime();
      const relPosition = position * 1000 - startTime;
      if (position * 1000 !== lastTime.current) {
        lastTime.current = position * 1000;
        props.setCurrentTime(relPosition);
      }

      if (player.current.readyState && loaded === false) {
        setDuration(props.runTime || player.current.duration * 1000);
        props.mediaLoading(
          1,
          1,
          props.runTime || player.current.duration * 1000
        );
        props.mediaLoaded(true);
        setLoaded(true);
      }

      if (relPosition >= duration && isPlaying) {
        props.finishedPlaying();
      }
    },
    1000 / 5,
    [loaded]
  );

  // Handle play/pause
  useLayoutEffect(() => {
    if (player.current) {
      if (isPlaying) {
        player.current.play();
      } else {
        if (player.current.readyState) {
          player.current.pause();
        }
      }
    }
  }, [isPlaying, url]);

  // Handle volume change.
  useLayoutEffect(() => {
    if (player.current) {
      player.current.setVolume(volume / 100);
    }
  }, [volume, url]);

  // Handle user-changed current time.
  useLayoutEffect(() => {
    if (player.current && currentTime !== lastTime.current) {
      // Toggle isSeeked flag in the state
      props.seek(!props.isSeeked);
      lastTime.current = currentTime;
      player.current.setCurrentTime(currentTime / 1000);
    }
  }, [currentTime, url]);

  if (!url) {
    return null;
  }

  return (
    <div>
      <audio ref={audio} preload="auto">
        {sources.map((source, key) => (
          <source key={key} src={source.src} />
        ))}
      </audio>
    </div>
  );
}

const mapStateProps = state => ({
  url: state.canvas.url,
  isSeeked: state.viewState.isSeeked,
  isPlaying: state.viewState.isPlaying,
  currentTime: state.viewState.currentTime + state.viewState.startTime,
  volume: state.viewState.volume,
  runTime: state.viewState.runTime,
  startTime: state.viewState.startTime,
});

const mapDispatchToProps = {
  mediaLoading,
  mediaLoaded,
  mediaError,
  setCurrentTime,
  finishedPlaying,
  seek,
};

export default connect(
  mapStateProps,
  mapDispatchToProps
)(Audio);
