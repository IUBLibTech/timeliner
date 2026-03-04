import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { mediaLoading, mediaLoaded, mediaError } from '../../actions/canvas';
import { setCurrentTime, finishedPlaying, seek } from '../../actions/viewState';
import useMediaPlayer from '../../hooks/useMediaPlayer';

function AudioPlayer({ url, ...props }) {
  const audio = useRef();
  useMediaPlayer(audio, { url, ...props });

  return (
    <div>
      <audio ref={audio} preload="auto">
        <source src={url} />
      </audio>
    </div>
  );
}

function Audio({ url, ...props }) {
  if (!url) {
    return null;
  }
  /**
   * Extract the <audio> element into a separate component to avoid invoking the useMediaPlayer hook
   * when the url is not available, which would cause errors.
   */
  return <AudioPlayer url={url} {...props} />;
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

Audio.propTypes = {
  url: PropTypes.string,
  isSeeked: PropTypes.bool,
  isPlaying: PropTypes.bool,
  currentTime: PropTypes.number,
  volume: PropTypes.number,
  runTime: PropTypes.number,
  startTime: PropTypes.number,
  mediaLoading: PropTypes.func,
  mediaLoaded: PropTypes.func,
  mediaError: PropTypes.func,
  setCurrentTime: PropTypes.func,
  finishedPlaying: PropTypes.func,
  seek: PropTypes.func,
};

export default connect(
  mapStateProps,
  mapDispatchToProps
)(Audio);
