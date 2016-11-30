import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators}  from 'redux';
import toastr from 'toastr';

import * as courseActions  from '../../actions/courseActions';

import CourseForm from './CourseForm';

class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state ={
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course});
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course).then(() => this.redirect()).catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course Saved!');
    this.context.router.push('/courses');
  }


  render() {
    return (
        <CourseForm
          course={this.state.course} allAuthors={this.props.authors} onSave={this.saveCourse} onChange={this.updateCourseState} errors={this.state.errors} loading={this.state.saving} />
    );
  }
}


ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};


ManageCoursePage.contextTypes = {
  router : PropTypes.object.isRequired
};


function getCourseById(courses, id) {
  const course = courses.filter( course => course.id === id);
  if (course) return course[0];
  return null;
}



function mapStateToProps(state, ownProps) {

  let course = { id: '', watchRef: '', title: '', authorId:'',length: '', category:''};
  const courseId = ownProps.params.id;
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorFormattedForDropdown = state.authors.map( author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course,
    authors:authorFormattedForDropdown
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
