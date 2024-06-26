import update from 'immutability-helper';
import {
  DEFAULT_PROJECT_STATE,
  UPDATE_SETTINGS,
  SET_LANGUAGE,
  SET_TITLE,
  SET_DESCRIPTION,
  RESET_DOCUMENT,
  EXPORT_DOCUMENT,
  LOAD_PROJECT,
  PROJECT,
  IMPORT_ERROR,
  SAVE_PROJECT,
  SET_COLOUR_PALETTE,
  PROJECT_CHANGED,
} from '../constants/project';

const project = (state = DEFAULT_PROJECT_STATE, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return update(state, {
        $merge: action.payload,
      });
    case SET_LANGUAGE:
      return update(state, {
        [PROJECT.LANGUAGE]: {
          $set: action.payload.language,
        },
        [PROJECT.IS_CHANGED]: {
          $set: false,
        },
      });
    case SET_TITLE:
      return update(state, {
        [PROJECT.TITLE]: {
          $set: action.payload.title,
        },
        [PROJECT.IS_CHANGED]: {
          $set: false,
        },
      });

    case SET_DESCRIPTION:
      return update(state, {
        [PROJECT.DESCRIPTION]: {
          $set: action.payload.description,
        },
        [PROJECT.IS_CHANGED]: {
          $set: false,
        },
      });
    case IMPORT_ERROR:
      return update(state, {
        error: { $set: action.payload.error },
      });
    case RESET_DOCUMENT:
      return state;
    case LOAD_PROJECT:
      return update(
        update(
          {},
          {
            $merge: DEFAULT_PROJECT_STATE,
          }
        ),
        {
          $merge: action.state,
        }
      );
    case SET_COLOUR_PALETTE:
      return update(state, {
        [PROJECT.COLOUR_PALETTE]: action.payload.pallet,
        [PROJECT.IS_CHANGED]: {
          $set: false,
        },
      });

    case EXPORT_DOCUMENT:
    case SAVE_PROJECT:
      return update(state, {
        [PROJECT.IS_CHANGED]: {
          $set: true,
        },
      });
    case PROJECT_CHANGED:
      return update(state, {
        [PROJECT.IS_CHANGED]: {
          $set: action.payload.isSaved,
        }
      })
    default:
      return state;
  }
};

export default project;
