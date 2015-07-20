var axios = require('axios');

// helper functions for interacting with the culpa api
// documentation - https://github.com/culpa-team/api
function getCourses(deptId) {
    return axios.get("http://api.culpa.info/courses/department_id/" + deptId);
}

function getDepartmentInfo(deptId) {
    return axios.get("http://api.culpa.info/departments/department_id/" + deptId);
}

function getDepartmentDetail(deptId) {
    return axios.all([getCourses(deptId), getDepartmentInfo(deptId)])
            .then(function(arr) {
                return {
                    info: arr[1].data.departments[0],
                    courses: arr[0].data.courses,
                    status: "success"
                }
            })
            .catch(function(arr) {
                return {
                    status: "error"
                }
            });
}

function getCourseInfo(courseId) {
    return axios.get("http://api.culpa.info/courses/course_id/" + courseId);
}

function getCourseReview(courseId) {
    return axios.get("http://api.culpa.info/reviews/course_id/" + courseId);
}

function getCourseDetail(courseId) {
    return axios.all([getCourseInfo(courseId), getCourseReview(courseId)])
            .then(function(arr) {
                return {
                    info: arr[0].data.courses[0],
                    courses: arr[1].data.reviews,
                    status: "success"
                }
            })
            .catch(function(arr) {
                return {
                    status: "error"
                }
            });
}

module.exports = {
    getDepartmentDetail: getDepartmentDetail,
    getCourseDetail: getCourseDetail
}
