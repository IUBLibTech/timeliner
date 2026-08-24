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

import { handleFocusTrap } from '../../utils/keyboardFocusTrap';
import { patchSliderA11y } from '../../hooks/useSliderA11y';

const BUBBLE_HEIGHT_MIN = 48;
const BUBBLE_HEIGHT_MAX = 80;

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

  constructor(props) {
    super(props);

    this.state = {
      ...DEFAULT_SETTINGS,
    };

    // Ref for focus management
    this.previousFocusRef = null;
    /* Container node for the bubble-height slider. This is used to patch MUI v3's
    slider component's a11y markup using 'patchSliderA11y()' from
    'useSliderA11y' hook. */
    this.bubbleHeightSliderNode = null;
  }

  /**
   * Patch MUI v3's Slider element's a11y markup used for bubble height adjustment
   * @param {Object} node slider element's React ref
   */
  patchBubbleHeightSliderA11y = (node) => {
    this.bubbleHeightSliderNode = node;
    patchSliderA11y(this.bubbleHeightSliderNode, {
      label: 'Bubble height',
      value: this.state.bubbleHeight,
      min: BUBBLE_HEIGHT_MIN,
      max: BUBBLE_HEIGHT_MAX,
    });
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
    /* Fix broken onChange event handler in MUI v3 Slider for mouse/touch interactions.
    For these events, the 'value' arg passed by MUI's callback is unreliable. Therefore,
    branch the handler based on the event type to recompute the 'value' arg from the pointer
    position instead of using the native arg value for mouse/touch events. */
    if (!(event.nativeEvent instanceof KeyboardEvent)) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const ratio = x / rect.width;
      const bubbleHeight = Math.round(
        BUBBLE_HEIGHT_MIN + ratio * (BUBBLE_HEIGHT_MAX - BUBBLE_HEIGHT_MIN)
      );
      value = Math.max(BUBBLE_HEIGHT_MIN, Math.min(BUBBLE_HEIGHT_MAX, bubbleHeight));
    }
    this.setState({ bubbleHeight: value });
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
    // Setup focus trap inside the modal
    handleFocusTrap(e, this.props.open);
  };

  /**
   * Add/Remove 'keydown' event listener when modal opens/closes
   * @param {Object} prevProps 
   */
  componentDidUpdate(prevProps) {
    if (this.props.open && !prevProps.open) {
      // Store current focused Settings button before modal opens
      this.previousFocusRef = document.activeElement;
      document.addEventListener('keydown', this.keyboardListener);
    }

    // Cleanup refs and keydown event listener
    if (!this.props.open && prevProps.open) {
      document.removeEventListener('keydown', this.keyboardListener);
      if (this.previousFocusRef && this.previousFocusRef.focus) {
        this.previousFocusRef.focus();
      }
      this.previousFocusRef = null;
    }
  }

  // Cleanup keydown event handler on unmount
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyboardListener);
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="settings-dialog-title"
        aria-modal="true"
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
                        <div ref={this.patchBubbleHeightSliderA11y}>
                          <Slider
                            onChange={this.handleSliderChange}
                            value={this.state.bubbleHeight}
                            min={BUBBLE_HEIGHT_MIN}
                            max={BUBBLE_HEIGHT_MAX}
                            step={1}
                            aria-label="Bubble height"
                            style={{
                              marginTop: 14, height: 5
                            }}
                          />
                        </div>
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
      </Dialog >
    );
  }
}
