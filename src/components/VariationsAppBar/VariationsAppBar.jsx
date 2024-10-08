import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import Save from '@material-ui/icons/Save';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import Settings from '@material-ui/icons/Settings';
import './VariationsAppBar.scss';

const VariationsAppBar = props => (
  <div
    className={props.noHeader ? 'variations-app-bar-no-header' : 'variations-app-bar'}
    style={{ position: 'static' }}
  >
    <Toolbar>
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginLeft: 10,
        }}
      >
        {props.noHeader ? null : (
          <Typography
            variant="h6"
            color="inherit"
            style={{
              fontWeight: 'normal',
            }}
          >
            Timeliner
          </Typography>
        )}
      </div>
      <div>
        {props.onSave || props.hasResource ? null : (
          <IconButton
            color="inherit"
            onClick={props.onImportButtonClicked}
            title="Open media file"
            disabled={props.isModalOpen}
          >
            <AddCircle />
          </IconButton>
        )}
        {props.onSave ? (
          <IconButton
            color="inherit"
            onClick={props.onSave}
            title={props.onSave ? 'Save timeline' : 'No backend set up to save'}
	    disabled={props.isModalOpen}
          >
            <Save />
          </IconButton>
        ) : null}
        <IconButton
          color="inherit"
          onClick={props.onUndo}
          disabled={((props.canUndo || false) === false) || props.isModalOpen}
          title="Undo"
        >
          <Undo />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={props.onRedo}
          disabled={((props.canRedo || false) === false) || props.isModalOpen}
          title="Redo"
        >
          <Redo />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={props.onSettingsButtonClicked}
          title="Settings"
	  disabled={props.isModalOpen}
        >
          <Settings />
        </IconButton>
      </div>
    </Toolbar>
  </div>
);

VariationsAppBar.propTypes = {
  /** action opens the import popup */
  onImportButtonClicked: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
  canUndo: PropTypes.bool,
  canRedo: PropTypes.bool,
  /** Invokes the save action */
  onSave: PropTypes.func,
  /** Opens the project settings modal */
  onSettingsButtonClicked: PropTypes.func.isRequired,
  noHeader: PropTypes.bool,
  /** Boolean value used for disabling components when modal is open */
  isModalOpen: PropTypes.bool.isRequired,
};

export default VariationsAppBar;
