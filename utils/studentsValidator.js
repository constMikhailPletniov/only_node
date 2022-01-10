const Joi = require('joi');
const { NUMS } = require('../config/config');

const createStudentValidator = Joi.object().keys({
  first_name: Joi.string().alphanum().min(NUMS.TWO).required(),
  last_name: Joi.string().alphanum().min(NUMS.TWO).required(),
  age: Joi.number().positive().integer().required(),
  university_id: Joi.number().positive().integer().required(),
});

const deleteStudentValidator = Joi.object().keys({
  id: Joi.number().integer().min(NUMS.ZERO).required(),
});

const editStudentValidator = Joi.object().keys({
  id: Joi.number().positive().integer().required(),
  first_name: Joi.string().alphanum().min(NUMS.TWO),
  last_name: Joi.string().alphanum().min(NUMS.TWO),
  age: Joi.number().positive().integer(),
});

module.exports = { createStudentValidator, deleteStudentValidator, editStudentValidator };
