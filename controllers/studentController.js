const { STATUS_CODE } = require('../config/config');
const { QUERY_VALIDATE, STUDENT_VALIDATE } = require('../utils');

const { STUDENTS_REPOSITORIES, COURSES_REPOSITORIES, UNIVERSITIES_REPOSITORIES } = require('../database/repositories');

const createStudentValidate = async (query) => {
  const { value, error } = STUDENT_VALIDATE.createStudentValidator.validate(query, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }
  const { error: dbError, result } = await STUDENTS_REPOSITORIES.createStudent(value);

  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: result, status: STATUS_CODE.OK } };
};

const deleteStudentValidate = async (query) => {
  const { value, error } = STUDENT_VALIDATE.deleteStudentValidator.validate(query, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }

  const student = await STUDENTS_REPOSITORIES.getStudent(value);
  if (!student.result[0]) {
    return { result: { data: 'Student not found', status: STATUS_CODE.INTERNAL_ERROR } };
  }

  const { error: dbError, result } = await STUDENTS_REPOSITORIES.deleteStudent(value);

  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: result, status: STATUS_CODE.OK } };
};

const getStudentsFromUniversityValidate = async (query) => {
  const { value, error } = QUERY_VALIDATE.idPageValidator.validate(query, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }

  const university = await UNIVERSITIES_REPOSITORIES.getUniversity(value.id);
  if (!university.result[0]) {
    return { result: { data: 'University not found', status: STATUS_CODE.INTERNAL_ERROR } };
  }

  const { error: dbError, result } = await STUDENTS_REPOSITORIES.getStudentsFromUniversity(value);

  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: result, status: STATUS_CODE.OK } };
};

const getStudentsFromCourseValidate = async (query) => {
  const { value, error } = QUERY_VALIDATE.coursePageNameValidator.validate(query, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }

  const course = await COURSES_REPOSITORIES.getCourseById(value);
  if (!course.result[0]) {
    return { result: { data: 'Course not found', status: STATUS_CODE.INTERNAL_ERROR } };
  }

  const { error: dbError, result } = await STUDENTS_REPOSITORIES.getStudentsFromCourse(value);

  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: result, status: STATUS_CODE.OK } };
};

const updateStudentValidate = async (query) => {
  const { value, error } = STUDENT_VALIDATE.editStudentValidator.validate(query, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }

  const student = await STUDENTS_REPOSITORIES.getStudent(value);
  if (!student) {
    return { result: { data: 'Student not found', status: STATUS_CODE.INTERNAL_ERROR } };
  }

  const { error: dbError, result } = await STUDENTS_REPOSITORIES.editStudent(value);

  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: result, status: STATUS_CODE.OK } };
};

module.exports = {
  createStudentValidate,
  deleteStudentValidate,
  getStudentsFromUniversityValidate,
  updateStudentValidate,
  getStudentsFromCourseValidate,
};
