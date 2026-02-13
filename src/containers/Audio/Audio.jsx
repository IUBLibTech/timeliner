import React, { useRef } from 'react';
import { connect } from 'react-redux';

import { mediaLoading, mediaLoaded, mediaError } from '../../actions/canvas';
import { setCurrentTime, finishedPlaying, seek } from '../../actions/viewState';
import useMediaPlayer from '../../hooks/useMediaPlayer';

function Audio({ url, ...props }) {
  const audio = useRef();
  useMediaPlayer(audio, { url, ...props });

  if (!url) {
    return null;
  }

  return (
    <div>
      <audio ref={audio} preload="auto">
        <source src={url} />
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
