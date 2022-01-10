const client = require('../database');

const createCourse = async (body) => {
  const {
    name,
    university_id,
    teacher_id,
  } = body;
  try {
    const course = await client.query(`INSERT INTO courses
      (name, teacher_id, university_id)
      VALUES('${name}', '${teacher_id}', '${university_id}') RETURNING *`);
    return { result: course.rows[0] };
  } catch (e) {
    return { error: e.message };
  }
};

const getCoursesFromUniversity = async (body) => {
  const { page, perPage, id } = body;
  try {
    const courses = await client.query(`SELECT name FROM courses WHERE university_id = ${id}
    ORDER BY id OFFSET ${(page - 1) * perPage} LIMIT ${perPage};`);
    return { result: { page, courses: courses.rows } };
  } catch (e) {
    return { error: e.message };
  }
};

const deleteCourse = async (body) => {
  const {
    name,
    university_id,
    teacher_id,
  } = body;
  try {
    await client.query(`delete from courses
      where name = '${name}' and  university_id = '${university_id}' and  teacher_id = '${teacher_id}'`);
    return { result: { message: 'Course was deleted' } };
  } catch (e) {
    return { error: e.message };
  }
};

const getCourse = async (body) => {
  const {
    name,
    university_id,
    teacher_id,
  } = body;
  try {
    const course = await client.query(`select name from courses
      where name = '${name}' and  university_id = '${university_id}' and  teacher_id = '${teacher_id}'`);
    return { result: course.rows };
  } catch (e) {
    return { error: e.message };
  }
};

const getCourseById = async (body) => {
  const {
    course_id,
  } = body;
  try {
    const course = await client.query(`select name from courses
      where id = '${course_id}'`);
    return { result: course.rows };
  } catch (e) {
    return { error: e.message };
  }
};

const deleteStudentFromCourse = async (body) => {
  const {
    student_id,
    course_id,
  } = body;
  try {
    await client.query(`delete from students_courses
      where student_id = '${student_id}' and  course_id = '${course_id}'`);
    return { result: { message: 'Student on this course was deleted' } };
  } catch (e) {
    return { error: e.message };
  }
};

const getStudentFromCourse = async (body) => {
  const {
    student_id,
    course_id,
  } = body;
  try {
    const student = await client.query(`select student_id from students_courses
      where student_id = '${student_id}' and  course_id = '${course_id}'`);
    return { result: student.rows };
  } catch (e) {
    return { error: e.message };
  }
};

const linkStudentToCourse = async (body) => {
  const {
    student_id, course_id,
  } = body;
  try {
    const studentCourse = await client.query(`INSERT INTO students_courses (student_id, course_id)
            VALUES (${student_id}, ${course_id})
            RETURNING *;`);
    return { result: studentCourse.rows };
  } catch (e) {
    return { error: e.message };
  }
};

module.exports = {
  createCourse,
  getCoursesFromUniversity,
  deleteCourse,
  deleteStudentFromCourse,
  linkStudentToCourse,
  getCourse,
  getStudentFromCourse,
  getCourseById,
};
