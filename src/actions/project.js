import {
  UPDATE_SETTINGS,
  SET_LANGUAGE,
  SET_TITLE,
  SET_DESCRIPTION,
  RESET_DOCUMENT,
  IMPORT_DOCUMENT,
  EXPORT_DOCUMENT,
  LOAD_PROJECT,
  IMPORT_ERROR,
  SAVE_PROJECT,
  SET_COLOUR_PALETTE,
  CLEAR_CUSTOM_COLORS,
  PROJECT_CHANGED,
} from '../constants/project';

export const updateSettings = form => ({
  type: UPDATE_SETTINGS,
  payload: form,
});

export const setLanguage = language => ({
  type: SET_LANGUAGE,
  payload: {
    language,
  },
});

export const setTitle = title => ({
  type: SET_TITLE,
  payload: {
    title,
  },
});

export const setDescription = description => ({
  type: SET_DESCRIPTION,
  payload: {
    description,
  },
});

export const resetDocument = () => ({
  type: RESET_DOCUMENT,
});

export const importDocument = (manifest, source) => ({
  type: IMPORT_DOCUMENT,
  manifest,
  source,
});

export const importError = error => ({
  type: IMPORT_ERROR,
  payload: { error: error.toString() },
});

export const exportDocument = () => ({
  type: EXPORT_DOCUMENT,
});

export const loadProject = state => ({
  type: LOAD_PROJECT,
  state,
});

export const saveProject = () => ({
  type: SAVE_PROJECT,
});

export const setcolourPalette = pallet => ({
  type: SET_COLOUR_PALETTE,
  payload: { pallet },
});

export const clearCustomColors = () => ({
  type: CLEAR_CUSTOM_COLORS,
});

export const setProjectChanged = isSaved => ({
  type: PROJECT_CHANGED,
  payload: { isSaved }
})
