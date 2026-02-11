import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { colourPalettes } from '../../config';
import './ColorPaletteSwitcher.scss';

// Render each color preview swatch with name
const PalettePreview = ({ name, colors }) => (
  <div className="color-palette-switcher__preview">
    <div className="color-palette-switcher__name">{name}</div>
    <div className="color-palette-switcher__swatches">
      {colors.map(color => (
        <div
          key={color}
          className="color-palette-switcher__swatch"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
      ))}
    </div>
  </div>
);

PalettePreview.propTypes = {
  name: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const ColorPaletteSwitcher = ({ currentKey, onChange }) => {
  return (
    <FormControl component="fieldset" className="color-palette-switcher" fullWidth={true}>
      <FormLabel component="legend">
        Select a color palette
      </FormLabel>
      <RadioGroup
        aria-label="color palette options"
        name="colorPalette"
        value={currentKey}
        onChange={(event) => onChange(event.target.value)}
        style={{ marginTop: 16 }}
      >
        {Object.keys(colourPalettes).map(key => {
          const palette = colourPalettes[key];
          const isChecked = currentKey === key;
          return (
            <FormControlLabel
              key={key}
              value={key}
              checked={isChecked}
              control={<Radio color="primary" disableRipple />}
              label={
                <PalettePreview
                  name={palette.name}
                  colors={palette.colours}
                />
              }
              labelPlacement="end"
              className={`color-palette-switcher__option ${isChecked ? 'is-selected' : ''}`}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

ColorPaletteSwitcher.propTypes = {
  /** Selected palette key */
  currentKey: PropTypes.string.isRequired,
  /** Change handler to update palette selection */
  onChange: PropTypes.func.isRequired,
};

export default ColorPaletteSwitcher;
