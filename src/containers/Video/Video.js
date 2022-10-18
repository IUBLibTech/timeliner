import React, { useLayoutEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import { seek, play, pause, setVolume } from '../../actions/viewState';
import Button from '@material-ui/core/Button';
import PictureInPicture from '@material-ui/icons/PictureInPicture';

// Media Element
import 'mediaelement/standalone';
import useEventListener from '../../hooks/useEventListener';

const { MediaElement } = window;

function Video({ url, volume, currentTime, startTime, isPlaying, poster, isSeeked, ...props }) {
  const video = useRef();
  const player = useRef();
  const sources = [{ src: url}];
  const lastTime = useRef(() => startTime - 1);
  const lastVolume = useRef();
  const [pipButtonText, setPipButtonText] = useState('Enter Picture-in-Picture mode');

  // Styling for video and PIP button
  const videoStyle = { objectFit: 'cover', background: 'black', boxShadow: 'gray 2px 2px 4px' };
  const videoDivStyle = { margin: '0 auto', padding: '5px' };
  const pipButtonStyles = { display: 'none', alignItems: 'center', flexWrap: 'wrap', marginTop: '20px' };

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
    player.current.setVolume(0);

    // Initialize Picture-in-Picture mode using PIP Web API
    initPIP();

    return () => {
      element.remove();
    };
  }, []);

  // When Picture-in-Picture is not an in-built feature of the browser,
  // use an external button to use the Picture-in-Picture Web API
  // to enable the feature
  // Reference: https://css-tricks.com/an-introduction-to-the-picture-in-picture-web-api/
  const initPIP = () => {
    const pipButton = document.getElementById('timeliner-pip-button');
    video.current.onloadedmetadata = function() {
      if ('pictureInPictureEnabled' in document) {
        pipButton.style.display = 'flex';
        pipButton.disabled = false;
        
        pipButton.addEventListener('click', () => {
          if (document.pictureInPictureElement) {
            document
              .exitPictureInPicture()
              .catch(error => {
                console.error('Error -> exitPictureInPicture() -> ', error);
              });
          } else {
            video.current
            .requestPictureInPicture()
            .catch(error => {
              console.error('Error -> requestPictureInPicture() -> ', error);
            });
          }
        });
      }

      // Change button text
      video.current.addEventListener('enterpictureinpicture', () => {
        setPipButtonText('Exit Picture-in-Picture mode');
      });

      video.current.addEventListener('leavepictureinpicture', () => {
        setPipButtonText('Enter Picture-in-Picture mode');
      });
    }
  }

  // Re-create player instance with media swap
  // TODO:: There's a slight time difference in the video and audio
  // players when media file gets swapped.
  // To reproduce: load a manifest -> play media -> pause media
  // -> swap media file with 'Open audio file' in toolbar ->
  // play media -> observe currentTime diff in the audio and video players
  useLayoutEffect(() => {
    if(url != null) {
      player.current = new MediaElement(
        video.current,
        {
          currentTime: currentTime / 1000,
        },
        [{ src: url }]
      );
      player.current.setVolume(0);
      player.current.setCurrentTime(currentTime / 1000);
      initPIP();
    };
  }, [url]);

  // Store last non-zero volume to restore it 
  // when using PiP controls
  useLayoutEffect(() => {
    if(volume > 0) {
      lastVolume.current = volume;
    }
  }, [volume])

  // Propagate play/pause and mute/unmute events from the picture-in-picture
  // player window to audio player
  useEventListener(player, 'play', () => {
    props.play();
  }, [url]);
  useEventListener(player, 'pause', () => {
    props.pause();
  }, [url]);
  useEventListener(player, 'volumechange', () => {
    if(player.current.muted) {
      props.setVolume(0);
    } else {
      props.setVolume(lastVolume.current);
    }
  }, [volume, url])

  // Handle play/pause events from the audio player
  useLayoutEffect(() => {
    if (player.current) {
      if (isPlaying) {
        player.current.setCurrentTime(currentTime / 1000);
        player.current.play();
        lastTime.current = player.current.currentTime;
      } else {
        if (player.current.readyState) {
          player.current.pause();
        }
      }
    }
  }, [isPlaying, url]);

  // While the video player is always on mute, sync mute/unmute
  // in the picture-in-picture window for visual purposes
  useLayoutEffect(() => {
    if (player.current && volume == 0) {
      player.current.setMuted(true);
    } else {
      player.current.setMuted(false);
    }
  }, [volume, url]);

  // Handle current time when seeked.
  useLayoutEffect(() => {
    if (player.current) {
      lastTime.current = currentTime;
      player.current.setCurrentTime(currentTime / 1000);
    }
    // Reset isSeeked state variable
    props.seek(false);
  }, [isSeeked, url]);

  if (!url) {
    return null;
  }

  return (
    <div style={videoDivStyle}>
      <video height={270} width={480} ref={video} poster={poster} style={videoStyle}>
        {sources.map((source, key) => (
          <source key={key} src={source.src} />
        ))}
      </video>
      <Button
        variant="text"
        id="timeliner-pip-button"
        color="primary"
        title="Picture-in-Picture mode"
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
};

export default connect(
  mapStateProps,
  mapDispatchToProps
)(Video);
