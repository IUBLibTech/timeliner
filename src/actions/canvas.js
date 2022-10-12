import {
  MEDIA_LOADING,
  MEDIA_LOADED,
  MEDIA_ERROR,
  LOAD_CANVAS,
  LOAD_POSTER,
  UNLOAD_MEDIA,
} from '../constants/canvas';
import invariant from '../utils/invariant';

export const mediaLoading = (bytesLoaded, bytesTotal, duration) => {
  invariant(
    () => bytesLoaded <= bytesTotal,
    'Bytes loaded cannot be more than the total'
  );
  const percent = parseInt((bytesLoaded / bytesTotal) * 100, 10);
  const percentLoaded = Number.isNaN(percent) ? 100 : percent;

  return {
    type: MEDIA_LOADING,
    payload: {
      percentLoaded,
      duration,
    },
  };
};

export const mediaLoaded = isLoaded => ({
  type: MEDIA_LOADED,
  payload: {
    isLoaded,
  },
});

export const mediaError = (code, description = 'Unknown error') => ({
  type: MEDIA_ERROR,
  payload: {
    code,
    description,
  },
});

export const loadCanvas = state => ({
  type: LOAD_CANVAS,
  state,
});

export const loadPoster = (poster) => ({
  type: LOAD_POSTER,
  payload: {
    poster,
  }
});

export const unloadMedia = () => ({
  type: UNLOAD_MEDIA,
});
