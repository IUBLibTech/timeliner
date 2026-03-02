import { useLayoutEffect, useRef, useState } from 'react';

import 'mediaelement/standalone';
import useEventListener from './useEventListener';
import useInterval from './useInterval';
import { ERROR_CODES } from '../constants/canvas';

const { MediaElement } = window;

export default function useMediaPlayer(elementRef, {
  url, volume, currentTime, startTime, isPlaying, isSeeked, runTime,
  setCurrentTime, finishedPlaying, seek,
  mediaLoading, mediaLoaded, mediaError,
}) {
  const player = useRef();
  const sources = [{ src: url }];
  const lastTime = useRef(() => startTime - 1);
  const [duration, setDuration] = useState();
  const [loaded, setLoaded] = useState();

  // Bootstrap MediaElement
  useLayoutEffect(() => {
    const element = new MediaElement(
      elementRef.current,
      { startVolume: volume / 100, currentTime: currentTime / 1000 },
      sources
    );
    player.current = element;
    setLoaded(false);
    return () => {
      element.remove();
    };
  }, []);

  // Error handling
  useEventListener(player, 'error', event => {
    if (event && event.type === 'error') {
      mediaError('error', ERROR_CODES.MEDIA_ERR_NETWORK);
    }
  });

  // Loop timer for calculating current time
  useInterval(
    () => {
      if (!player.current) return;

      if (player.current.readyState && loaded === false) {
        setDuration(runTime || player.current.duration * 1000);
        mediaLoading(1, 1, runTime || player.current.duration * 1000);
        mediaLoaded(true);
        setLoaded(true);
      }

      const position = player.current.getCurrentTime();
      const relPosition = position * 1000 - startTime;
      if (position * 1000 !== lastTime.current) {
        lastTime.current = position * 1000;
        setCurrentTime(relPosition);
      }

      if (relPosition >= duration && isPlaying) {
        finishedPlaying();
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
      } else if (player.current.readyState) {
        player.current.pause();
      }
    }
  }, [isPlaying, url]);

  // Handle volume change and mute/unmute.
  useLayoutEffect(() => {
    if (player.current) {
      player.current.setVolume(volume / 100);
      if (volume == 0) {
        player.current.muted = true;
      } else {
        player.current.muted = false;
      }
    }
  }, [volume, url]);

  // Handle user-changed current time.
  useLayoutEffect(() => {
    if (player.current && currentTime !== lastTime.current) {
      // Toggle isSeeked flag in the state
      seek(!isSeeked);
      lastTime.current = currentTime;
      player.current.setCurrentTime(currentTime / 1000);
    }
  }, [currentTime, url]);

  return player;
}
