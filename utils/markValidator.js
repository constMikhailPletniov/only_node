const Joi = require('joi');
const { NUMS } = require('../config/config');

const setMarkValidator = Joi.object().keys({
  student_id: Joi.number().positive().integer().required(),
  course_id: Joi.number().positive().integer().required(),
  mark: Joi.number().min(NUMS.ONE).max(NUMS.HUNDRED).integer()
    .required(),
});

module.exports = { setMarkValidator };
