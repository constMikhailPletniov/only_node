const Joi = require('joi');
const { NUMS } = require('../config/config');

const idValidator = Joi.object().keys({
  id: Joi.number().integer().min(NUMS.ZERO).required(),
});

const idPageValidator = Joi.object().keys({
  id: Joi.number().integer().min(NUMS.ZERO).required(),
  page: Joi.number().positive().integer().min(NUMS.ONE)
    .default(NUMS.ONE),
  perPage: Joi.number().positive().integer().min(NUMS.ONE)
    .default(NUMS.FIVE),
  name: Joi.string().default(''),
});

const coursePageNameValidator = Joi.object().keys({
  page: Joi.number().positive().integer().min(NUMS.ONE)
    .default(NUMS.ONE),
  perPage: Joi.number().positive().integer().min(NUMS.ONE)
    .default(NUMS.FIVE),
  name: Joi.string().default(''),
  course_id: Joi.number().integer().min(NUMS.ZERO).required(),
});

const countCourseValidator = Joi.object().keys({
  course_id: Joi.number().integer().min(NUMS.ZERO).required(),
  count: Joi.number().integer().min(1).default(NUMS.HUNDRED),
});

const namePageValidator = Joi.object().keys({
  page: Joi.number().positive().integer().min(NUMS.ONE)
    .default(NUMS.ONE),
  perPage: Joi.number().positive().integer().min(NUMS.ONE)
    .default(NUMS.FIVE),
  name: Joi.string().default(''),
});

module.exports = {
  idValidator, idPageValidator, coursePageNameValidator, countCourseValidator, namePageValidator,
};
