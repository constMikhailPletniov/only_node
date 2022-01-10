const pgClient = require('../database');

const createStudent = async (query) => {
  const {
    first_name,
    last_name,
    age,
    user_role,
    university_id,
  } = query;
  try {
    const student = await pgClient.query(`INSERT INTO users
      (first_name, last_name, age, user_role, university_id)
      VALUES('${first_name}', '${last_name}', '${age}', 'student', '${university_id}') RETURNING *`);
    return { result: student.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};

const deleteStudent = async (body) => {
  const {
    id,
  } = body;
  try {
    await pgClient.query(`delete from users
      where id = '${id}' and user_role = 'student'`);
    return { result: { message: 'Student was deleted' } };
  } catch (e) {
    return { error: e.message };
  }
};

const getStudent = async (body) => {
  const {
    id,
  } = body;
  try {
    const student = await pgClient.query(`SELECT id FROM users WHERE id = ${id} and user_role = 'student';`);
    return { result: student.rows };
  } catch (e) {
    return { error: e.message };
  }
};

const getStudentsFromUniversity = async (body) => {
  const { page, perPage, id } = body;
  try {
    const students = await pgClient.query(`SELECT first_name, last_name FROM users WHERE university_id = ${id} and user_role = 'student'
    ORDER BY id OFFSET ${(page - 1) * perPage} LIMIT ${perPage};`);
    return { result: { page, universities: students.rows } };
  } catch (e) {
    return { error: e.message };
  }
};

const getStudentsFromCourse = async (body) => {
  const {
    page, perPage, course_id, name,
  } = body;
  try {
    const students = await pgClient.query(`  SELECT users.*
            FROM students_courses
            JOIN users ON students_courses.student_id = users.id
            WHERE course_id = ${course_id} and first_name ILIKE '%${name}%'
            ORDER BY id OFFSET ${(page - 1) * perPage} LIMIT ${perPage};`);
    return { result: { page, universities: students.rows } };
  } catch (e) {
    return { error: e.message };
  }
};

const editStudent = async (body) => {
  try {
    const {
      id,
      first_name,
      last_name,
      age,
    } = body;

    let query = 'UPDATE users SET ';

    const studentData = [];
    if (first_name) studentData.push(`first_name = '${first_name}'`);
    if (last_name) studentData.push(`last_name = '${last_name}'`);
    if (age) studentData.push(`age = ${age}`);
    query += studentData.join(',');
    query += `WHERE id = ${id} RETURNING *`;

    const student = await pgClient.query(query);
    return { result: student.rows[0] };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  createStudent,
  deleteStudent,
  getStudentsFromUniversity,
  editStudent,
  getStudent,
  getStudentsFromCourse,
};
