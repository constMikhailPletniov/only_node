const pgClient = require('../database');

const createTeacher = async (query) => {
  const {
    first_name,
    last_name,
    age,
    user_role,
    university_id,
  } = query;
  try {
    const teacher = await pgClient.query(`INSERT INTO users
      (first_name, last_name, age, user_role, university_id)
      VALUES('${first_name}', '${last_name}', '${age}', 'teacher', '${university_id}') RETURNING *`);
    return { result: teacher.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};

const getTeachersFromUniversity = async (body) => {
  const { page, perPage, university_id } = body;
  try {
    const teachers = await pgClient.query(`SELECT first_name, last_name FROM users WHERE university_id = ${university_id} and user_role = 'teacher'
    ORDER BY id OFFSET ${(page - 1) * perPage} LIMIT ${perPage};`);
    return { result: { page, teachers: teachers.rows } };
  } catch (e) {
    return { error: e.message };
  }
};

module.exports = { createTeacher, getTeachersFromUniversity };
