import voca from 'voca';
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Slider from '@material-ui/lab/Slider';

import {
  PROJECT,
  DEFAULT_SETTINGS,
  BUBBLE_STYLES,
} from '../../constants/project';
import ColourSwatchPicker from '../ColourSwatchPicker/ColourSwatchPicker';
import ColorPaletteSwitcher from '../ColorPaletteSwitcher/ColorPaletteSwitcher';

export default class SettingsPopup extends React.Component {
  static propTypes = {
    /** Callback for when settings saved */
    onSave: PropTypes.func.isRequired,
    /** Callback to dismiss the form */
    onClose: PropTypes.func.isRequired,
    /** is the dialog open */
    open: PropTypes.bool,
    /** initial settings state */
    settings: PropTypes.object,
    clearCustomColors: PropTypes.func.isRequired,
  };

  static defaultProps = {
    open: false,
  };

  state = {
    ...DEFAULT_SETTINGS,
  };

  handleChange = (name, type) => event => {
    this.setState({
      [name]: type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  onSelectBackground = value => {
    this.setState({
      [PROJECT.BACKGROUND_COLOUR]: value,
    });
  };

  handleSliderChange = (event, value) => {
    this.setState({
      bubbleHeight: value,
    });
  };

  onSaveClicked = () => {
    this.props.onSave(this.state);
    this.props.onClose();
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.open === false && this.props.open) {
      this.setState({ ...prevProps.settings });
    }
    return null;
  }

  keyboardListener = e => {
    // Make sure keydown events are captured only when modal is open
    if (this.props.open && e.keyCode === 13) {
      if (e.target.tagName === 'BUTTON') {
        return;
      }
      e.preventDefault();
      this.onSaveClicked();
    }
  };

  /**
   * Add/Remove 'keydown' event listener when modal opens/closes
   * @param {Object} prevProps 
   */
  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      document.addEventListener('keydown', this.keyboardListener);
    }
    if (prevProps.open && !this.props.open) {
      document.removeEventListener('keydown', this.keyboardListener);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyboardListener);
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="settings-dialog-title"
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle id="settings-dialog-title">Settings</DialogTitle>
        <DialogContent style={{ padding: '12px 20px', maxWidth: 'none' }}>
          <div style={{ padding: 0 }}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="stretch"
              spacing={8}
            >
              <Grid item md={6} sm={12}>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  spacing={8}
                >
                  <Grid item>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Media Settings</FormLabel>
                      <FormGroup>
                        {[
                          [
                            PROJECT.START_PLAYING_WHEN_BUBBLES_CLICKED,
                            'checkbox',
                            'Start playing when bubble or marker is clicked.',
                          ],
                          /** 
                            [
                              PROJECT.STOP_PLAYING_END_OF_SECTION,
                              'checkbox',
                              'Stop Playing at the end of the section.',
                            ],
                            [
                              PROJECT.START_PLAYING_END_OF_SECTION,
                              'checkbox',
                              'Loop playback at the end of the section.',
                            ],
                            */
                        ].map(([key, type, label]) => (
                          <FormControlLabel
                            key={key}
                            control={
                              <Checkbox
                                checked={this.state[key]}
                                onChange={this.handleChange(key, type)}
                                value={key}
                                color="primary"
                              />
                            }
                            label={label}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        Timeline Appearance
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state[PROJECT.SHOW_TIMES]}
                              onChange={this.handleChange(
                                PROJECT.SHOW_TIMES,
                                'checkbox'
                              )}
                              value={PROJECT.SHOW_TIMES}
                              color="primary"
                            />
                          }
                          label="Show Times"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state[PROJECT.SHOW_MARKERS]}
                              onChange={this.handleChange(
                                PROJECT.SHOW_MARKERS,
                                'checkbox'
                              )}
                              value={PROJECT.SHOW_MARKERS}
                              color="primary"
                            />
                          }
                          label="Show Markers"
                        />
                        <FormControl component="fieldset">
                          <FormLabel
                            component="legend"
                            style={{
                              marginBottom: 14,
                              paddingTop: 14,
                            }}
                          >
                            Background color
                          </FormLabel>
                          <ColourSwatchPicker
                            swatch={[]}
                            label="Background color"
                            currentColour={
                              this.state[PROJECT.BACKGROUND_COLOUR]
                            }
                            onSelectColour={this.onSelectBackground}
                          />
                        </FormControl>
                        <FormControl component="fieldset">
                          <FormLabel
                            component="legend"
                            style={{
                              paddingTop: 24,
                            }}
                          >
                            Bubble Shape
                          </FormLabel>
                          <RadioGroup
                            aria-label="bubble shape"
                            name={PROJECT.BUBBLE_STYLE}
                            value={this.state[PROJECT.BUBBLE_STYLE]}
                            onChange={this.handleChange(PROJECT.BUBBLE_STYLE)}
                          >
                            <FormControlLabel
                              value={BUBBLE_STYLES.ROUNDED}
                              control={<Radio color="primary" />}
                              label={voca.capitalize(BUBBLE_STYLES.ROUNDED)}
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value={BUBBLE_STYLES.SQUARE}
                              control={<Radio color="primary" />}
                              label={voca.capitalize(BUBBLE_STYLES.SQUARE)}
                              labelPlacement="end"
                            />
                          </RadioGroup>
                        </FormControl>
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Bubble Height</FormLabel>
                      <FormGroup>
                        <Slider
                          onChange={this.handleSliderChange}
                          value={this.state.bubbleHeight}
                          min={48}
                          max={80}
                          step={1}
                          style={{
                            marginTop: 14,
                          }}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state[PROJECT.AUTO_SCALE_HEIGHT]}
                              onChange={this.handleChange(
                                PROJECT.AUTO_SCALE_HEIGHT,
                                'checkbox'
                              )}
                              value={PROJECT.AUTO_SCALE_HEIGHT}
                              color="primary"
                            />
                          }
                          label="Auto Scale Height On Resize"
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  {/* TODO: phase 2... <Grid item>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        Bubble Level Colours
                      </FormLabel>
                      <FormGroup>TODO: Colour theme editor</FormGroup>
                    </FormControl>
                  </Grid> */}
                </Grid>
              </Grid>
              <Grid item md={6} sm={12}>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  spacing={8}
                >
                  <Grid item>
                    <ColorPaletteSwitcher
                      currentKey={this.state[PROJECT.COLOUR_PALETTE]}
                      onChange={key =>
                        this.setState({ [PROJECT.COLOUR_PALETTE]: key })
                      }
                    />
                  </Grid>
                  <Grid item style={{ marginTop: 6 }}>
                    <Button
                      onClick={this.props.clearCustomColors}
                      variant={'outlined'}
                      fullWidth
                    >
                      Clear all custom bubble colors
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={this.onSaveClicked}
            variant="contained"
            color="primary"
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
