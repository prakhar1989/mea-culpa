var express = require('express');
var app = express();
var Api = require('./api');
var objectAssign = require('object-assign');

// allow CORS
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    res.send(JSON.stringify({msg: "mea culpa!"}));
});

// TODO: Try to make the responseTime thing DRY'er
app.get('/api/department/:id', function(req, res) {
    var start = +new Date();
    var id = req.params.id;
    Api.getDepartmentDetail(id).then(function(data) {
        var mergedResp = objectAssign(data, {responseTime: +new Date() - start});
        res.send(JSON.stringify(mergedResp));
    });
});

app.get('/api/course/:id', function(req, res) {
    var start = +new Date();
    var id = req.params.id;
    Api.getCourseDetail(id).then(function(data) {
        data["reviews"] = data.reviews.filter(function(r) {
            return r.review_text !== undefined;
        });
        var mergedResp = objectAssign(data, {responseTime: +new Date() - start});
        res.send(JSON.stringify(mergedResp));
    });
})

app.get("/api/search/:query", function(req, res) {
    var start = +new Date();
    var query = req.params.query;
    Api.getSearchResults(query).then(function(data) {
        var profs = data.professors.map(function(prof) {
            return {
                id: prof.id,
                name: prof.first_name + " " + prof.middle_name + " " + prof.last_name,
                nugget: prof.nugget
            };
        });
        var courses = data.courses
            .filter(function(course) {
                return course.number !== null && course.number !== undefined;
            })
            .map(function(course) {
                return {
                    id: course.id,
                    department_id: course.departments_id,
                    name: course.number + " " + course.name
                };
            });
        var mergedResp = objectAssign(data, {
            professors: profs,
            courses: courses,
            responseTime: +new Date() - start
        });
        res.send(JSON.stringify(mergedResp));
    });
});

var server = app.listen(app.get('port'), function() {
    console.log("App started on :" + app.get('port'));
});
