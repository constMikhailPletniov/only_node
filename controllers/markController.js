
const { formatRating } = require('../helpers/formatResults');
const { STATUS_CODE } = require('../config/config');
const { MARK_VALIDATE, QUERY_VALIDATE } = require('../utils');
const { MARKS_REPOSITORIES, COURSES_REPOSITORIES } = require('../database/repositories');

const setMarkValidate = async (query) => {
  const { value, error } = MARK_VALIDATE.setMarkValidator.validate(query, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }

  const student = await COURSES_REPOSITORIES.getStudentFromCourse(value);
  if (!student.result[0]) {
    return { result: { data: 'Student on this course not found', status: STATUS_CODE.BAD_REQUEST } };
  }

  const { error: dbError, result } = await MARKS_REPOSITORIES.setMark(value);

  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: result, status: STATUS_CODE.OK } };
};

const getStudentsRatingFromCourseValidate = async (query) => {
  const { value, error } = QUERY_VALIDATE.countCourseValidator.validate(query, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }

  const course = await COURSES_REPOSITORIES.getCourseById(value);
  if (!course.result[0]) {
    return { result: { data: 'Course not found', status: STATUS_CODE.BAD_REQUEST } };
  }

  const { error: dbError, result } = await MARKS_REPOSITORIES.getStudentsRatingFromCourse(value);
  if (dbError) return { error: { status: STATUS_CODE.BAD_REQUEST, data: dbError } };
  return { result: { data: formatRating(result), status: STATUS_CODE.OK } };
};

module.exports = {
  getStudentsRatingFromCourseValidate,
  setMarkValidate,
};
