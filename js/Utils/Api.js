var axios = require('axios');

const URL = "https://nameless-dawn-4159.herokuapp.com/api";

module.exports = {
    getDepartmentDetail : (id) => axios.get(URL + '/department/' + id),
    getCourseDetail     : (id) => axios.get(URL + '/course/' + id),
    getProfessorDetail  : (id) => axios.get(URL + '/professor/' + id)
};
