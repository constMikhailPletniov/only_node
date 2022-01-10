module.exports = {
    PORT: 5000,
    METHOD: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
    },
    ENDPOINTS: {
        UNIVERSITIES: '/universities',
        UNIVERSITIES_LIST: '/universities/list',
        UNIVERSITIES_STUDENT_RATING: '/university/student/rating',
        USERS: '/users',
        TEACHER: '/teacher',
        COURSES: '/courses',
        STUDENTS_COURSES: '/students_courses',
        RATING: '/rating',
        TEACHER_UNIVERSITY: '/teacher/university',
        COURSE: '/course',
        COURSE_LIST: '/course/list',
        STUDENT: '/student',
        STUDENT_UNIVERSITY_LIST: '/student/university/list',
        STUDENT_COURSE_LIST: '/student/course/list',
        STUDENT_RATING: '/student/rating',
        STUDENT_COURSE: '/student_course',
        MARK: '/mark',
        STUDENT_UPDATE: '/student/update'
    },
    STATUS_CODE: {
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        INTERNAL_ERROR: 500,
        OK: 200
    },
    NUMS: {
        ZERO: 0,
        ONE: 1,
        TWO: 2,
        THREE: 3,
        FOUR: 4,
        FIVE: 5,
        SIX: 6,
        SEVEN: 7,
        EIGHT: 8,
        NINE: 9,
        TEN: 10,
        SIXTEEN: 16,
        FIFTY: 50,
        HUNDRED: 100
    },

}