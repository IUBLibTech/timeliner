import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from './Video';
import { play, pause } from '../../actions/viewState';

class VideoDemo extends Component {
  play = () => {
    this.props.play();
  };

  pause = () => {
    this.props.pause();
  };

  render() {
    const { loadingPercent, currentTime, runTime, isPlaying } = this.props;
    return (
      <div>
        <Video />
        <br />
        {loadingPercent !== 100 ? (
          ''
        ) : isPlaying ? (
          <button onClick={this.pause}>Pause</button>
        ) : (
          <button onClick={this.play}>Play</button>
        )}
        <br />
        Loaded {loadingPercent}% - {currentTime} / {runTime}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loadingPercent: state.canvas.loadingPercent,
  currentTime: state.viewState.currentTime,
  runTime: state.viewState.runTime,
  isPlaying: state.viewState.isPlaying,
});

const mapDispatchToProps = {
  play,
  pause,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoDemo);
