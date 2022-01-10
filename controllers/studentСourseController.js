
const { STATUS_CODE } = require('../config/config');
const { COURSE_VALIDATE } = require('../utils');
const { COURSES_REPOSITORIES } = require('../database/repositories');

const linkStudentToCourseValidate = async (query) => {
  const { value, error } = COURSE_VALIDATE.studentCourseValidator.validate(query, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }

  const course = await COURSES_REPOSITORIES.getCourseById(value);
  if (!course.result[0]) {
    return { result: { data: 'Course not found', status: STATUS_CODE.INTERNAL_ERROR } };
  }

  const { error: dbError, result } = await COURSES_REPOSITORIES.linkStudentToCourse(value);

  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: result, status: STATUS_CODE.OK } };
};

const deleteStudentFromCourseValidate = async (query) => {
  const { value, error } = COURSE_VALIDATE.studentCourseValidator.validate(query, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }

  const student = await COURSES_REPOSITORIES.getStudentFromCourse(value);
  if (!student.result[0]) {
    return { result: { data: 'Student on this course not found', status: STATUS_CODE.INTERNAL_ERROR } };
  }

  const { error: dbError, result } = await COURSES_REPOSITORIES.deleteStudentFromCourse(value);

  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: result, status: STATUS_CODE.OK } };
};

module.exports = {
  deleteStudentFromCourseValidate,
  linkStudentToCourseValidate,
};
