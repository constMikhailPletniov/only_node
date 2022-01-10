const pgClient = require('../database');

const getStudentsRatingFromCourse = async (body) => {
  const { course_id, count } = body;
  try {
    const studentRating = await pgClient.query(`   SELECT student_id, avg(mark) AS rating 
            FROM marks
            WHERE course_id = ${course_id}
            GROUP BY student_id
            ORDER BY rating DESC
            LIMIT ${count};`);

    return { result: studentRating.rows };
  } catch (e) {
    return { error: e.message };
  }
};

const setMark = async (body) => {
  const { mark, student_id, course_id } = body;
  try {
    const studentMark = await pgClient.query(`INSERT INTO marks (mark, student_id, course_id)
            VALUES (${mark}, ${student_id}, ${course_id})
            RETURNING *`);
    return { result: studentMark.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};

module.exports = { getStudentsRatingFromCourse, setMark };
