const Joi = require('joi');

const courseValidator = Joi.object().keys({
  name: Joi.string().min(2).required(),
  teacher_id: Joi.number().positive().integer().required(),
  university_id: Joi.number().positive().integer().required(),
});

const studentCourseValidator = Joi.object().keys({
  student_id: Joi.number().positive().integer().required(),
  course_id: Joi.number().positive().integer().required(),
});

module.exports = { studentCourseValidator, courseValidator };
