import update from 'immutability-helper';
import {
  DEFAULT_CANVAS_STATE,
  MEDIA_LOADING,
  MEDIA_LOADED,
  MEDIA_ERROR,
  LOAD_CANVAS,
  UNLOAD_MEDIA,
  CANVAS,
  LOAD_POSTER,
} from '../constants/canvas';

const canvas = (state = DEFAULT_CANVAS_STATE, action) => {
  switch (action.type) {
    case MEDIA_LOADING:
      return update(state, {
        [CANVAS.PERCENT_LOADED]: {
          $set: action.payload.percentLoaded,
        },
      });
    case MEDIA_LOADED:
      return update(state, {
        [CANVAS.IS_LOADED]: {
          $set: action.payload.isLoaded,
        },
        [CANVAS.PERCENT_LOADED]: {
          $set: 100,
        },
      });
    case MEDIA_ERROR:
      return update(state, {
        [CANVAS.ERROR]: {
          code: {
            $set: action.payload.code,
          },
          description: {
            $set: action.payload.description,
          },
        },
      });
    case UNLOAD_MEDIA:
      return update(state, {
        [CANVAS.URL]: {
          $set: null,
        },
        [CANVAS.IS_LOADED]: {
          $set: false,
        },
        [CANVAS.PERCENT_LOADED]: {
          $set: 0,
        },
      });
    case LOAD_CANVAS:
      return update(DEFAULT_CANVAS_STATE, {
        $merge: action.state,
      });
    case LOAD_POSTER:
      return update(state, {
        [CANVAS.POSTER]: {
          $set: action.payload.poster
        }
      });
    default:
      return state;
  }
};

export default canvas;
