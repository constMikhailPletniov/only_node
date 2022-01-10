const URL = require('url');
const { METHOD, ENDPOINTS, STATUS_CODE } = require('../config/config');
const { MARKS_CONTROLLERS, COURSES_CONTROLLERS, STUDENT_CONTROLLERS,
  STUDENT_COURSES_CONTROLLERS, TEACHER_CONTROLLERS, UNIVERSITIES_CONTROLLERS } = require('../controllers');


const router = async ({ req, res, body }) => {
  let result, error;

  const { query, pathname } = URL.parse(req.url, true);
  switch (true) {
    case req.method === METHOD.POST && pathname === ENDPOINTS.UNIVERSITIES:
      ({ result, error } = await UNIVERSITIES_CONTROLLERS.createUniversityValidate(body));
      break;

    case req.method === METHOD.GET && pathname === ENDPOINTS.UNIVERSITIES:
      ({ result, error } = await UNIVERSITIES_CONTROLLERS.getUniversityValidate(query));
      break;

    case req.method === METHOD.GET && pathname === ENDPOINTS.UNIVERSITIES_LIST:
      ({ result, error } = await UNIVERSITIES_CONTROLLERS.getUniversitiesListValidate(query));
      break;

    case req.method === METHOD.POST && pathname === ENDPOINTS.TEACHER:
      {
        ({ result, error } = await TEACHER_CONTROLLERS.createTeacherValidate(body));
        break;
      }

    case req.method === METHOD.GET && pathname === ENDPOINTS.TEACHER_UNIVERSITY:
      {
        ({ result, error } = await TEACHER_CONTROLLERS.getTeachersFromUniversityValidate(query));
        break;
      }

    case req.method === METHOD.POST && pathname === ENDPOINTS.COURSE:
      {
        ({ result, error } = await COURSES_CONTROLLERS.createCourseValidate(body));
        break;
      }

    case req.method === METHOD.GET && pathname === ENDPOINTS.COURSE_LIST:
      {
        ({ result, error } = await COURSES_CONTROLLERS.getCoursesFromUniversityValidate(query));
        break;
      }

    case req.method === METHOD.DELETE && pathname === ENDPOINTS.COURSE:
      {
        ({ result, error } = await COURSES_CONTROLLERS.deleteCourseValidate(query));
        break;
      }

    case req.method === METHOD.POST && pathname === ENDPOINTS.STUDENT:
      {
        ({ result, error } = await STUDENT_CONTROLLERS.createStudentValidate(body));
        break;
      }

    case req.method === METHOD.DELETE && pathname === ENDPOINTS.STUDENT:
      {
        ({ result, error } = await STUDENT_CONTROLLERS.deleteStudentValidate(query));
        break;
      }

    case req.method === METHOD.GET && pathname === ENDPOINTS.STUDENT_UNIVERSITY_LIST:
      {
        ({ result, error } = await STUDENT_CONTROLLERS.getStudentsFromUniversityValidate(query));
        break;
      }

    case req.method === METHOD.GET && pathname === ENDPOINTS.STUDENT_COURSE_LIST:
      {
        ({ result, error } = await STUDENT_CONTROLLERS.getStudentsFromCourseValidate(query));
        break;
      }

    case req.method === METHOD.GET && pathname === ENDPOINTS.STUDENT_RATING:
      {
        ({ result, error } = await MARKS_CONTROLLERS.getStudentsRatingFromCourseValidate(query));

        break;
      }

    case req.method === METHOD.POST && pathname === ENDPOINTS.STUDENT_COURSE:
      {
        ({ result, error } = await STUDENT_COURSES_CONTROLLERS.linkStudentToCourseValidate(body));

        break;
      }

    case req.method === METHOD.DELETE && pathname === ENDPOINTS.STUDENT_COURSE:
      {
        ({ result, error } = await STUDENT_COURSES_CONTROLLERS.deleteStudentFromCourseValidate(query));
        break;
      }

    case req.method === METHOD.POST && pathname === ENDPOINTS.MARK:
      {
        ({ result, error } = await MARKS_CONTROLLERS.setMarkValidate(body));
        break;
      }

    case req.method === METHOD.PUT && pathname === ENDPOINTS.STUDENT_UPDATE:
      {
        ({ result, error } = await STUDENT_CONTROLLERS.updateStudentValidate(body));
        break;
      }

    case req.method === METHOD.GET && pathname === ENDPOINTS.UNIVERSITIES_STUDENT_RATING:
      {
        ({ result, error } = await UNIVERSITIES_CONTROLLERS.studentsRatingByUniversityValidate(body));
        break;
      }

    default:
      res.statusCode = STATUS_CODE.NOT_FOUND;
      return res.end(JSON.stringify({ error: 'Route Not Found' }));
  }
  if (error) {
    res.statusCode = error.status;
    return res.end(JSON.stringify(error.data));
  }
  res.statusCode = result.status;
  res.end(JSON.stringify(result.data));
};

module.exports = { router };
