const pgClient = require('../database');

const createUniversity = async (body) => {
  const {
    country, city, name, accreditation,
  } = body;
  try {
    const university = await pgClient.query(`INSERT INTO universities (country, city, name, accreditation)
      VALUES ('${country}', '${city}', '${name}', ${accreditation} ) RETURNING *`);
    return { result: university.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};

const getUniversity = async (id) => {
  try {
    const university = await pgClient.query(`SELECT *  FROM universities WHERE id = ${id};`);
    return { result: university.rows };
  } catch (e) {
    return { error: e.message };
  }
};

const getUniversityList = async (body) => {
  const { page, perPage, name } = body;
  try {
    const universities = await pgClient.query(`SELECT * FROM universities
     WHERE name ILIKE '%${name}%' ORDER BY id OFFSET ${(page - 1) * perPage} LIMIT ${perPage};`);
    return { result: { page, universities: universities.rows } };
  } catch (e) {
    return { error: e.message };
  }
};

const studentsRatingByUniversity = async () => {
  try {
    const universities = await pgClient.query(`
            SELECT universities.id, universities.name, users.id AS student_id, users.first_name, users.last_name , AVG(marks.mark) AS rating 
            FROM universities
            JOIN users ON universities.id = users.university_id
            LEFT OUTER JOIN marks ON users.id = marks.student_id
            WHERE users.user_role = 'student'
            GROUP BY universities.id, users.id;
        `);
    return { result: universities.rows };
  } catch (e) {
    return { error: e.message };
  }
};

module.exports = {
  createUniversity, getUniversity, getUniversityList, studentsRatingByUniversity,
};
