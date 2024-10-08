import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { timeToHHmmss } from '../../utils/timeMethods';
import './CurrentTimeIndicator.scss';

class CurrentTimeIndicator extends Component {
  static propTypes = {
    /** Current time of the audio */
    currentTime: PropTypes.number.isRequired,
    /** Full runtime of audio */
    runtime: PropTypes.number.isRequired,
    /** Separator between times */
    separator: PropTypes.string,
  };

  static defaultProps = {
    separator: ' / ',
  };

  state = {
    currentFormattedTime: '00:00:00',
    currentFormattedRuntime: '00:00:00',
    error: '',
  };

  componentWillMount() {
    this.validateProps(this.props);
    this.updateTimeFormat(this.props.currentTime, this.props.runtime);
    this.updateRuntimeFormat(this.props.runtime);
  }

  validateProps(props) {
    if (props.currentTime > props.runtime) {
      return this.setState({
        currentFormattedTime: timeToHHmmss(0),
      });
    }

    if (this.state.error) {
      return this.setState({ error: null });
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.validateProps(nextProps);
    if (nextProps.currentTime !== this.props.currentTime) {
      this.updateTimeFormat(nextProps.currentTime, nextProps.runtime);
    }
    if (nextProps.runtime !== this.props.runtime) {
      this.updateRuntimeFormat(nextProps.runtime);
    }
  }

  updateRuntimeFormat(runtime) {
    return this.setState({
      currentFormattedRuntime: timeToHHmmss(runtime / 1000.0, runtime >= 3600000),
    });
  }

  updateTimeFormat(time, runtime) {
    return this.setState({
      currentFormattedTime: timeToHHmmss(time / 1000.0, runtime >= 3600000),
    });
  }

  render() {
    const { separator } = this.props;
    const { currentFormattedTime, currentFormattedRuntime } = this.state;

    if (this.state.error) {
      return (
        <span className='current-time-indicator--error'>{this.state.error}</span>
      );
    }

    return (
      <span className='current-time-indicator'>
        <span className='current-time-indicator__current-time'>
          {currentFormattedTime}
        </span>
        <span className='current-time-indicator__separator'>{separator}</span>
        <span className='current-time-indicator__runtime'>
          {currentFormattedRuntime}
        </span>
      </span>
    );
  }
}

export default CurrentTimeIndicator;
