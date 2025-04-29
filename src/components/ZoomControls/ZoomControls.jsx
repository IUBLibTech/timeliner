import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import YoutubeSearchedFor from '@material-ui/icons/YoutubeSearchedFor';
import './ZoomControls.scss';

const ZoomControls = props => (
  <div className="zoom-controls">
    <IconButton
      onClick={props.onZoomIn}
      disabled={!props.onZoomIn || props.disabled}
      title="Zoom In"
    >
      <ZoomIn />
    </IconButton>
    <IconButton
      onClick={props.onResetView}
      disabled={!props.onResetView || props.disabled}
      title="Reset View"
    >
      <YoutubeSearchedFor />
    </IconButton>
    <IconButton
      onClick={props.onZoomOut}
      disabled={!props.onZoomOut || props.disabled}
      title="Zoom Out"
    >
      <ZoomOut />
    </IconButton>
  </div>
);

ZoomControls.propTypes = {
  /** Handler for zooming in, will show disabled if null */
  onZoomIn: PropTypes.func,
  /** Handler for zooming out, will show disabled if null */
  onZoomOut: PropTypes.func,
  /** Handler for resetting view */
  onResetView: PropTypes.func,
  disabled: PropTypes.bool,
};

ZoomControls.defaultProps = {
  onZoomIn: null,
  onZoomOut: null,
  onResetView: null,
  disabled: false,
};

export default ZoomControls;
