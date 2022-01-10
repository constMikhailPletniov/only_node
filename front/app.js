const menu = document.querySelector('#menu');
const universityTemplate = document.querySelector('#university-template').innerHTML;
const studentTemplate = document.querySelector('#students-template').innerHTML;


const createElementFromHtml = (stringHTML) => {
    const template = document.createElement('template');
    stringHTML = stringHTML.trim();
    template.innerHTML = stringHTML;
    return template.content.firstChild;
};

const getUniversity = ({ university_id, name, students } = {}) => {
    const html = universityTemplate
        .replace('{{university-id}}', university_id)
        .replace('{{university-name}}', name);

    const university = createElementFromHtml(html);
    students.forEach((students) => {
        const studentHtml = studentTemplate
            .replace('students-id', students.student_id,)
            .replace('students-first_name', students.first_name)
            .replace('students-last_name', students.last_name)
            .replace('students-rating', students.rating);
        university.lastElementChild.append(createElementFromHtml(studentHtml));
    });

    return university;
};

const addUniversity = (university) => {
    menu.append(getUniversity(university));
};

const getUniversitiesInfo = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3000/university/student/rating', {
            method: 'GET',
        });
        const data = await response.json();
        data.forEach(addUniversity);
    } catch (error) {
        console.log(error)
    }
};

const handleClickMenu = (event) => {
    const element = event.target.closest('.menu__item');
    if (element) {
        element.classList.toggle('active');
    }
};

getUniversitiesInfo();


menu.addEventListener('click', handleClickMenu);

