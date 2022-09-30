import React, { useLayoutEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { audioLoading, audioLoaded, audioError } from '../../actions/canvas';
import { setCurrentTime, finishedPlaying, seekAudio } from '../../actions/viewState';

// Media Element
import 'mediaelement/standalone';

const { MediaElement } = window;

function Video({ url, volume, currentTime, startTime, isPlaying, poster, isSeeked, ...props }) {
  const video = useRef();
  const player = useRef();
  const sources = [{ src: url }];
  const lastTime = useRef(() => startTime - 1);

  // Set background color to black for manifests without poster image
  const videoStyle = { objectFit: 'cover', background: 'black', boxShadow: 'gray 2px 2px 4px' };
  const videoDivStyle = {margin: '0 auto', padding: '5px' };

  // Bootstrap the element.
  useLayoutEffect(() => {
    const element = new MediaElement(
      video.current,
      {
        currentTime: currentTime / 1000,
      },
      sources
    );
    player.current = element;
    // Set volume to zero, use audio player's volume
    player.current.setVolume(0)
    return () => {
      element.remove();
    };
  }, []);

  // Handle play/pause
  useLayoutEffect(() => {
    if (player.current) {
      if (isPlaying) {
        player.current.play();
        lastTime.current = player.currentTime;
      } else {
        if (player.current.readyState) {
          player.current.pause();
        }
      }
    }
  }, [isPlaying, url]);

  // Handle current time when seeked.
  useLayoutEffect(() => {
    if(isSeeked) {
      if (player.current && currentTime !== lastTime.current) {
        lastTime.current = currentTime;
        player.current.setCurrentTime(currentTime / 1000);
        // Reset isSeeked state variable
        props.seekAudio(false);
      }
    }
  }, [isSeeked, url]);

  if (!url) {
    return null;
  }

  return (
    <div style={videoDivStyle}>
      <video height={270} width={480} ref={video} poster={poster} style={videoStyle}>
        Your browser does not support the video tag.
      </video>
    </div>
    
  );
}

const mapStateProps = state => ({
  url: state.canvas.url,
  poster: state.canvas.poster,
  isPlaying: state.viewState.isPlaying,
  isSeeked: state.viewState.isSeeked,
  currentTime: state.viewState.currentTime + state.viewState.startTime,
  volume: state.viewState.volume,
  runTime: state.viewState.runTime,
  startTime: state.viewState.startTime,
});

const mapDispatchToProps = {
  audioLoading,
  audioLoaded,
  audioError,
  setCurrentTime,
  finishedPlaying,
  seekAudio,
};

export default connect(
  mapStateProps,
  mapDispatchToProps
)(Video);
