
const { STATUS_CODE } = require('../config/config');
const { TEACHER_VALIDATE } = require('../utils');
const { TEACHERS_REPOSITORIES } = require('../database/repositories');

const createTeacherValidate = async (query) => {
  const { value, error } = TEACHER_VALIDATE.createTeacherValidator.validate(query, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }
  const { error: dbError, result } = await TEACHERS_REPOSITORIES.createTeacher(value);

  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: result, status: STATUS_CODE.OK } };
};

const getTeachersFromUniversityValidate = async (query) => {
  const { value, error } = TEACHER_VALIDATE.getTeachersFromUniversityValidator.validate(query, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }

  const { error: dbError, result } = await TEACHERS_REPOSITORIES.getTeachersFromUniversity(value);

  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: result, status: STATUS_CODE.OK } };
};

module.exports = {
  createTeacherValidate,
  getTeachersFromUniversityValidate,
};
