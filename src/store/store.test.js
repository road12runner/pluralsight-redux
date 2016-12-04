import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', () => {
    it ('Should handle creating course', () => {
      const store = createStore(rootReducer, initialState);

      const course = {
        title: 'Clean Code'
      };

      const action = courseActions.createCourseSuccess(course);

      store.dispatch(action);

      //assert
      const actual = store.getState().courses[0];
      const expected = {
        title: 'Clean Code'
      };

      console.log(actual);


      expect(actual.title).toEqual(expected.title);

    });
});
