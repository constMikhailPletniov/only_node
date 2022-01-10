const _ = require('lodash');

const formatUniversityStudentsRating = (value) => _(value)
  .groupBy('id')
  .map((group, university_id) => ({
    university_id: group[0].id,
    name: group[0].name,
    students: group.map(({
      first_name, last_name, rating, student_id,
    }) => ({
      student_id,
      first_name,
      last_name,
      rating: Number(Number(rating)
        .toFixed(1)),
    })),
  }))
  .value();

const formatRating = (value) => value.map((data) => {
  data.rating = Number(Number(data.rating)
    .toFixed(1));
  return value;
});

module.exports = {
  formatUniversityStudentsRating,
  formatRating,
};
