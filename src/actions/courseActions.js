import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';



export function loadCourses() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses().then(  courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch( error => {
      throw(error);
    });
  };
}


function loadCoursesSuccess(courses) {
  return {
    type:  types.LOAD_COURSES_SUCCESS,
    courses
  };
}

function updateCourseSuccess(course) {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course
  };
}

export function createCourseSuccess(course) {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course
  };
}

export function saveCourse(course) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then( course => {
        if (course.id) {
          dispatch(updateCourseSuccess(course));
        } else {
          dispatch(createCourseSuccess(course));
        }
    }).catch( error => {
      dispatch(ajaxCallError());
      throw  error;
    });


  };
}
