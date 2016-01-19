import expect from 'expect';

import reducer from '../example';

import {
  UPDATE_TEXT
} from '../../ActionTypes';

describe('example reducer', () => {
  it('updates text when UPDATE_TEXT action is triggered', () => {
    const state = reducer(undefined, {
      type: UPDATE_TEXT,
      text: 'test text',
    });

    expect(state.text).toEqual('test text');
  });
});
