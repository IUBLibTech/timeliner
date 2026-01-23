import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import importResource, { mapImportErrorMessage } from './AudioImporter.Utils';
import FileUpload from '../FileUpload/FileUpload';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { handleFocusTrap } from '../../utils/keyboardFocusTrap';

class AudioImporter extends Component {
  static propTypes = {
    /** Callback for when a manifest is imported, receives manifest object */
    onImport: PropTypes.func.isRequired,
    /** On close */
    onClose: PropTypes.func,
    /** is the dialog open */
    open: PropTypes.bool,
    /** Error state from the parent */
    error: PropTypes.string,
  };

  static defaultProps = {
    open: false,
    error: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      localFile: false,
      error: '',
    };

    // Ref for focus management
    this.previousFocusRef = null;
  }

  importUrlField = React.createRef();

  onImportResource = () => {
    const { onImport } = this.props;
    const resourceUri = this.importUrlField.value;
    importResource(resourceUri)
      .then(manifest => {
        onImport(manifest, resourceUri);
      })
      .catch(error => this.setState({ error }));
  };

  onKeyPress = () => {
    this.setState({ error: '' });
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.onImportResource();
    }
  };

  toggleLocalFile = () => {
    this.setState(s => ({ localFile: !s.localFile }));
  };

  handleLocalImport = data => {
    const { onImport } = this.props;

    if (data && data.error) {
      return this.setState({
        error: mapImportErrorMessage(data.error.toString()),
      });
    }

    if (!data) {
      return this.setState({
        error: mapImportErrorMessage('unknown'),
      });
    }

    try {
      onImport(data, data['@id']);
      this.setState({ error: null });
    } catch (err) {
      this.setState({ error: err });
    }
  };

  handleChange = (e, currentTab) => {
    this.setState({ localFile: currentTab === 1 });
  };

  // Cleanup keydown event handler with focus trap function
  cleanupFocusTrap = () => {
    document.removeEventListener('keydown', (e) => handleFocusTrap(e, this.props.open));
  };

  componentDidUpdate(prevProps) {
    if (this.props.open) {
      // Store current focused audio importer button before modal opens
      this.previousFocusRef = document.activeElement;

      // Setup focus trap inside the modal
      document.addEventListener('keydown', (e) => handleFocusTrap(e, this.props.open));
    }

    // Cleanup refs and focus trap
    if (!this.props.open && prevProps.open) {
      this.cleanupFocusTrap();
      if (this.previousFocusRef && this.previousFocusRef.focus) {
        this.previousFocusRef.focus();
      }
      this.previousFocusRef = null;
    }
  }

  componentWillUnmount() {
    this.cleanupFocusTrap();
  }

  render() {
    const { open, onClose } = this.props;
    const { localFile } = this.state;
    const error = this.state.error || this.props.error;

    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Open media file</DialogTitle>
        <div style={{ padding: '0 20px' }}>
          <Tabs
            variant="fullWidth"
            value={localFile ? 1 : 0}
            onChange={this.handleChange}
            indicatorColor="primary"
          >
            <Tab label="URL" />
            <Tab label="Local file" />
          </Tabs>
        </div>
        <DialogContent style={{ width: 400, padding: 20 }}>
          <form onKeyDown={this.handleKeyDown}>
            {localFile ? (
              <DialogContentText style={{ marginBottom: 10 }}>
                Open a saved project from your computer (.json)
              </DialogContentText>
            ) : (
              <DialogContentText style={{ marginBottom: 10 }}>
                Open an audio/video file (.mp3, .mp4, .json) from the web
              </DialogContentText>
            )}
            {localFile ? (
              <FileUpload onChange={this.handleLocalImport} />
            ) : (
              <TextField
                inputRef={x => (this.importUrlField = x)}
                autoFocus
                margin="dense"
                id="manifestUrl"
                name="manifestUrl"
                label="Audio/Video or Manifest url"
                type="url"
                onKeyPress={this.onKeyPress}
                fullWidth
                variant="outlined"
              />
            )}
            {error && (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button disabled={!onClose} onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={this.onImportResource}
            variant="contained"
            color="primary"
          >
            Import
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AudioImporter;
