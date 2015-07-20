var axios = require('axios');

const URL = "http://localhost:3000/api"

module.exports = {
    getDepartmentDetail : (id) => axios.get(URL + '/department/' + id),
    getCourseDetail     : (id) => axios.get(URL + '/course/' + id),
    getProfessorDetail  : (id) => axios.get(URL + '/professor/' + id)
};