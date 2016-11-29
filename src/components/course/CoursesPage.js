import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
//import * as actions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

import CourseList from './CourseList';


class CoursesPage extends Component {
  constructor(props,context) {
    super(props, context);
    this.redirectToCoursePage = this.redirectToCoursePage.bind(this);
  }

  courseRow(course, index) {
    return (
      <div key={index}>
        {course.title}
      </div>
    );
  }

  redirectToCoursePage() {
    browserHistory.push('/course');
  }

  render(){
    const {courses} = this.props;
    return (

      <div>
        <h1>Courses</h1>
        <input
          type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToCoursePage}
        />
        <CourseList courses={courses}/>
      </div>

    );
  }
}


CoursesPage.propTypes = {
  courses : PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state,ownProps) {
  return {
    courses : state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions :  bindActionCreators(courseActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
