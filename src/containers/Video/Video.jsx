import React, { useLayoutEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import { mediaLoading, mediaLoaded, mediaError } from '../../actions/canvas';
import { setCurrentTime, finishedPlaying, seek, play, pause, setVolume } from '../../actions/viewState';
import Button from '@material-ui/core/Button';
import PictureInPicture from '@material-ui/icons/PictureInPicture';

import useEventListener from '../../hooks/useEventListener';
import useMediaPlayer from '../../hooks/useMediaPlayer';

function Video({ url, volume, poster, ...props }) {
  const video = useRef();
  const lastVolume = useRef();
  const [pipButtonText, setPipButtonText] = useState('Enter Picture-in-Picture mode');

  const player = useMediaPlayer(video, { url, volume, ...props });

  // Styling for video and PIP button
  const videoStyle = { background: 'black', boxShadow: 'gray 2px 2px 4px' };
  const videoDivStyle = { margin: '0 auto', padding: '5px' };
  const pipButtonStyles = { display: 'none', alignItems: 'center', flexWrap: 'wrap', marginTop: '20px' };

  /**
   * When Picture-in-Picture is not an in-built feature of the browser,
   * create an external button to provide the Picture-in-Picture feature via Web API.
   * Reference: https://css-tricks.com/an-introduction-to-the-picture-in-picture-web-api/
   */
  const initPIP = () => {
    const pipButton = document.getElementById('timeliner-pip-button');
    const videoElement = document.getElementsByTagName('video')[0];
    if ('pictureInPictureEnabled' in document && videoElement) {
      pipButton.style.display = 'flex';

      pipButton.addEventListener('click', () => {
        if (document.pictureInPictureElement) {
          document
            .exitPictureInPicture()
            .catch(error => {
              console.error('Error -> exitPictureInPicture() -> ', error);
            });
        } else {
          videoElement
            .requestPictureInPicture()
            .catch(error => {
              console.error('Error -> requestPictureInPicture() -> ', error);
            });
        }
      });
    }

    // Change button text
    videoElement.addEventListener('enterpictureinpicture', () => {
      setPipButtonText('Exit Picture-in-Picture mode');
    });

    videoElement.addEventListener('leavepictureinpicture', () => {
      setPipButtonText('Enter Picture-in-Picture mode');
    });
  };

  // Store last non-zero volume to restore it when using PiP controls
  useLayoutEffect(() => {
    if (volume > 0) {
      lastVolume.current = volume;
    }
  }, [volume]);

  // Propagate play/pause and mute/unmute events from the picture-in-picture
  // player window to the Redux state
  useEventListener(player, 'play', () => {
    props.play();
  }, [url]);
  useEventListener(player, 'pause', () => {
    props.pause();
  }, [url]);
  useEventListener(player, 'volumechange', () => {
    if (player.current.muted) {
      props.setVolume(0);
    } else {
      props.setVolume(lastVolume.current);
    }
  }, [volume, url]);
  useEventListener(player, 'loadedmetadata', () => {
    initPIP();
  });

  if (!url) {
    return null;
  }

  return (
    <div style={videoDivStyle}>
      <video height={270} width={480} ref={video} poster={poster} style={videoStyle}
        aria-label="Timeliner video player"
        tabIndex={0}
        playsInline
        preload="auto"
      >
        <source src={url} />
      </video>
      <Button
        variant="text"
        id="timeliner-pip-button"
        color="primary"
        title="Picture-in-Picture mode"
        aria-label={pipButtonText}
        style={pipButtonStyles}
      >
        <PictureInPicture nativeColor="#FF4081" style={{ marginRight: 20 }} />
        {pipButtonText}
      </Button>
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
  seek,
  play,
  pause,
  setVolume,
  mediaLoading,
  mediaLoaded,
  mediaError,
  setCurrentTime,
  finishedPlaying,
};

export default connect(
  mapStateProps,
  mapDispatchToProps
)(Video);
