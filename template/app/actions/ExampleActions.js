import {UPDATE_TEXT} from '../ActionTypes';

export function updateText(text) {
  return {
    type: UPDATE_TEXT,
    text
  };
}
