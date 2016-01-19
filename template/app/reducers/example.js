import createImmutableReducer from '../util/immutableReducer';
import I from 'immutable';

import {UPDATE_TEXT} from '../ActionTypes';

const State = I.Record({
  text: null,
});

const initialState = new State({
  text: 'hello react'
});

const exampleReducer = createImmutableReducer(initialState, {
  [UPDATE_TEXT]: function({text}, state) {
    return state.set('text', text);
  }
});

export default exampleReducer;
