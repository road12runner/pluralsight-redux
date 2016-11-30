import delay from './delay';

const courses = [
  {
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
    authorId: "cory-house",
    length: "5:08",
    category: "JavaScript"
  },
  {
    id: "clean-code",
    title: "Clean Code: Writing Code for Humans",
    watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
    authorId: "cory-house",
    length: "3:10",
    category: "Software Practices"
  },
  {
    id: "architecture",
    title: "Architecting Applications for the Real World",
    watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
    authorId: "cory-house",
    length: "2:52",
    category: "Software Architecture"
  },
  {
    id: "career-reboot-for-developer-mind",
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
    authorId: "cory-house",
    length: "2:30",
    category: "Career"
  },
  {
    id: "web-components-shadow-dom",
    title: "Web Component Fundamentals",
    watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
    authorId: "cory-house",
    length: "5:10",
    category: "HTML5"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

const generateId = (course) => {
  return replaceAll(course.title,' ', '-');
};


class CourseApi {
  static getAllCourses() {
    return new Promise((resolve, reject) => {
      setTimeout( () => {
        resolve(Object.assign([], courses));
      },delay)
    })
  }

  static saveCourse(course) {
    course = Object.assign({}, course);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const minCourseTitleLength = 1;
        if (course.title.length < minCourseTitleLength) {
          reject(`Title mus be at least ${minCourseTitleLength} symbols.`);
        }

        if (course.id) {
          const existingCourseIndex = courses.findIndex( a => a.id === course.id);
          courses.splice(existingCourseIndex , 1,  course);
        } else {
          course.id = generateId(course);
          course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
          courses.push(course);
        }

        resolve(course);


      }, delay);
    })
  }


  static deleteCourse(courseId) {
    return new Promise((resolve, reject)=> {
      setTimeout( () => {
        const existingCourseIndex = courses.findIndex( a => a.id === course.id);
        courses.splice(existingCourseIndex, 1);
      }, delay)
    });
  }


}


export default CourseApi;
