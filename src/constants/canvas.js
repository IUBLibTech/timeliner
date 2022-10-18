const DEFAULT_URI = ''; //'https://webaudioapi.com/samples/audio-tag/chrono.mp3';

export const CANVAS = {
  URL: 'url',
  IS_LOADED: 'isLoaded',
  PERCENT_LOADED: 'loadingPercent',
  ERROR: 'error',
  IS_VIDEO: 'isVideo',
  POSTER: 'poster',
};

export const DEFAULT_CANVAS_STATE = {
  [CANVAS.URL]: DEFAULT_URI,
  [CANVAS.IS_LOADED]: false,
  [CANVAS.PERCENT_LOADED]: 0,
  [CANVAS.ERROR]: {
    code: null,
    description: '',
  },
  [CANVAS.IS_VIDEO]: false,
  [CANVAS.POSTER]: '',
};

export const MEDIA_LOADED = 'MEDIA_LOADED';
export const MEDIA_LOADING = 'MEDIA_LOADING';
export const MEDIA_ERROR = 'MEDIA_ERROR';
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME';
export const LOAD_CANVAS = 'LOAD_CANVAS';
export const LOAD_POSTER = 'LOAD_POSTER';
export const UNLOAD_MEDIA = 'UNLOAD_MEDIA';
export const ERROR_CODES = {
  MEDIA_ERR_ABORTED: 'Download aborted',
  MEDIA_ERR_NETWORK: 'A network error occurred',
  MEDIA_ERR_DECODE: 'An error occurred while decoding the media resource',
  MEDIA_ERR_SRC_NOT_SUPPORTED: 'Media file format not supported',
};
