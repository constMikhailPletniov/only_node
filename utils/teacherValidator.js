const Joi = require('joi');
const { NUMS } = require('../config/config');

const createTeacherValidator = Joi.object().keys({
  first_name: Joi.string().alphanum().min(NUMS.TWO).required(),
  last_name: Joi.string().alphanum().min(NUMS.TWO).required(),
  age: Joi.number().positive().integer().required(),
  university_id: Joi.number().positive().integer().required(),
});

const getTeachersFromUniversityValidator = Joi.object().keys({
  university_id: Joi.number().positive().integer().required(),
  page: Joi.number().positive().integer().min(NUMS.ONE)
    .default(NUMS.ONE),
  perPage: Joi.number().positive().integer().min(NUMS.ONE)
    .default(NUMS.TEN),
  name: Joi.string().min(NUMS.TWO).default(''),
});

module.exports = { createTeacherValidator, getTeachersFromUniversityValidator };
