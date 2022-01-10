const Joi = require('joi');
const { NUMS } = require('../config/config');

const universityValidator = Joi.object().keys({
  name: Joi.string().min(NUMS.ONE).required(),
  country: Joi.string().min(NUMS.TWO).required(),
  accreditation: Joi.number().min(NUMS.ONE).max(NUMS.FIVE).required(),
  city: Joi.string().min(NUMS.TWO).required(),
});

module.exports = { universityValidator };
