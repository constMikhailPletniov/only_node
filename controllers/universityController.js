
const { formatUniversityStudentsRating } = require('../helpers/formatResults');
const { STATUS_CODE } = require('../config/config');
const { UNIVERSITIES_REPOSITORIES } = require('../database/repositories');
const { UNIVERSITIES_VALIDATE, QUERY_VALIDATE } = require('../utils');

const createUniversityValidate = async (body) => {
  const { value, error } = UNIVERSITIES_VALIDATE.universityValidator.validate(body, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }
  const { error: dbError, result } = await UNIVERSITIES_REPOSITORIES.createUniversity(value);

  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: result, status: STATUS_CODE.OK } };
};
const getUniversityValidate = async (query) => {
  const { value, error } = QUERY_VALIDATE.idValidator.validate(query, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }

  const { error: dbError, result } = await UNIVERSITIES_REPOSITORIES.getUniversity(value.id);

  if (!result[0]) {
    return { result: { data: 'University not found', status: STATUS_CODE.INTERNAL_ERROR } };
  }

  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: result, status: STATUS_CODE.OK } };
};

const getUniversitiesListValidate = async (query) => {
  const { value, error } = QUERY_VALIDATE.namePageValidator.validate(query, { abortEarly: false });
  if (error) {
    return { error: { status: STATUS_CODE.BAD_REQUEST, data: error.message } };
  }

  const { error: dbError, result } = await UNIVERSITIES_REPOSITORIES.getUniversityList(value);

  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: result, status: STATUS_CODE.OK } };
};

const studentsRatingByUniversityValidate = async () => {
  const { error: dbError, result } = await UNIVERSITIES_REPOSITORIES.studentsRatingByUniversity();

  if (dbError) return { error: { status: STATUS_CODE.INTERNAL_ERROR, data: dbError } };
  return { result: { data: formatUniversityStudentsRating(result), status: STATUS_CODE.OK } };
};

module.exports = {
  createUniversityValidate,
  getUniversityValidate,
  getUniversitiesListValidate,
  studentsRatingByUniversityValidate,
};
