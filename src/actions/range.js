import {
  SPLIT_RANGE_AT,
  GROUP_RANGES,
  SELECT_RANGE,
  UPDATE_RANGE,
  MOVE_POINT,
  DELETE_RANGE,
  DELETE_RANGES,
  LOAD_RANGES,
  DELETE_REDUNDANT_SIZES,
  UPDATE_DEPTHS_AFTER_DELETE,
  UPDATE_RANGE_TIME,
  CREATE_RANGE,
  RANGE_MUTATION, SCHEDULE_DELETE_RANGES, SCHEDULE_DELETE_RANGE,
} from '../constants/range';
import { internal } from '../utils/internal-action';
import generateId from '../utils/generateId';

export const splitRangeAt = time => ({
  type: SPLIT_RANGE_AT,
  payload: {
    time,
  },
});

export const rangeMutations = mutations => ({
  type: RANGE_MUTATION,
  payload: { mutations },
});

/**
 * @deprecated
 */
export const groupSelectedRanges = () => ({
  type: GROUP_RANGES,
});

export const selectRange = (id, isSelected, deselectOthers = true) => ({
  type: SELECT_RANGE,
  payload: {
    id,
    isSelected,
    deselectOthers,
  },
});

export const createRange = props => ({
  type: CREATE_RANGE,
  payload: { id: generateId(), ...props },
});

export const updateRangeTime = (
  id,
  { startTime, endTime },
  undoable = true
) => ({
  type: undoable ? UPDATE_RANGE_TIME : internal(UPDATE_RANGE_TIME),
  payload: { id, startTime, endTime },
});

export const updateRange = (
  id,
  { label, summary, startTime, endTime, colour, whiteText }
) => ({
  type: UPDATE_RANGE,
  payload: {
    id,
    label,
    summary,
    startTime,
    endTime,
    colour,
    whiteText,
  },
});

/**
 * @deprecated
 */
export const movePoint = (x, originalX) => ({
  type: MOVE_POINT,
  payload: {
    x,
    originalX,
  },
});

export const deleteRange = id => ({
  type: DELETE_RANGE,
  payload: { id },
});

export const scheduleDeleteRange = id => ({
  type: SCHEDULE_DELETE_RANGE,
  payload: { id },
});

export const scheduleDeleteRanges = ranges => ({
  type: SCHEDULE_DELETE_RANGES,
  payload: { ranges },
});

/**
 * @deprecated
 */
export const deleteRedundantSizes = () => ({
  type: DELETE_REDUNDANT_SIZES,
});

/**
 * @deprecated
 */
export const updateDepthsAfterDelete = () => ({
  type: UPDATE_DEPTHS_AFTER_DELETE,
});

/**
 * @deprecated
 */
export const loadRanges = ranges => ({
  type: LOAD_RANGES,
  ranges,
});
