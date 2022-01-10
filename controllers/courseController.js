
const { COURSE_VALIDATE, QUERY_VALIDATE } = require('../utils');
const { COURSES_REPOSITORIES } = require('../database/repositories');
const { STATUS_CODE } = require('../config/config');

const createCourseValidate = async (query) => {
  const { value, error } = COURSE_VALIDATE.courseValidator.validate(query, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }
  const { error: dbError, result } = await COURSES_REPOSITORIES.createCourse(value);

  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: result, status: STATUS_CODE.OK } };
};

const getCoursesFromUniversityValidate = async (query) => {
  const { value, error } = QUERY_VALIDATE.idPageValidator.validate(query, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }

  const { error: dbError, result } = await COURSES_REPOSITORIES.getCoursesFromUniversity(value);

  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: result, status: STATUS_CODE.OK } };
};

const deleteCourseValidate = async (query) => {
  const { value, error } = COURSE_VALIDATE.courseValidator.validate(query, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }

  const course = await COURSES_REPOSITORIES.getCourse(value);
  if (!course.result[0]) {
    return { result: { data: 'Course not found', status: STATUS_CODE.INTERNAL_ERROR } };
  }

  const { error: dbError, result } = await COURSES_REPOSITORIES.deleteCourse(value);
  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: result, status: STATUS_CODE.OK } };
};

module.exports = {
  createCourseValidate,
  getCoursesFromUniversityValidate,
  deleteCourseValidate,
};
