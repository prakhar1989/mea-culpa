var express = require('express');
var Api = require('./api');
var sentiment = require('sentiment');
var bodyParser = require('body-parser');
var cors = require('cors');
var responseTime = require('response-time');

// instantiate express app
var app = express();

// middleware config
app.use(cors());
app.use(bodyParser.json());
app.use(responseTime());

// for heroku
app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    res.send({msg: "mea culpa"});
});

app.get('/api/department/:id', function(req, res) {
    var id = req.params.id;
    Api.getDepartmentDetail(id).then(function(data) {
        res.send(data);
    });
});

app.get('/api/course/:id', function(req, res) {
    var id = req.params.id;
    Api.getCourseDetail(id).then(function(data) {

        // filtering blank reviews
        data["reviews"] = data.reviews.filter(function(r) {
            return r.review_text !== undefined;
        })
        .map(function(r) {
            // adding extra props
            r["sentiment_score"] = sentiment(r.review_text).score;

            // placeholders for upvotes and downvotes
            r["upvotes"] = Math.round(Math.random() * 20);
            r["downvotes"] = Math.round(Math.random() * 20);
            return r;
        });

        // sorting by date
        data["reviews"] = data.reviews.sort(function(r1, r2) {
            var d1 = Date.parse(r1.created);
            var d2 = Date.parse(r2.created);
            if (d1 < d2) return 1;
            else if (d1 > d2) return -1;
            else return r1.review_text < r2.review_text;
        });

        return data;
    }).then(function(courseData) {
        // NOTE: We're only listing the first department
        var deptId = courseData.info.department_ids[0];
        Api.getDepartmentInfo(deptId).then(function(data) {
            courseData["department"] = data.data.departments[0];
            res.send(courseData);
        })
    })
})

app.get("/api/search/:query", function(req, res) {
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
        data["professors"] = profs;
        data["courses"] = courses;
        res.send(data);
    });
});

app.get("/api/professor/:id", function(req, res) {
    var id = req.params.id;
    Api.getProfessorDetail(id).then(function(data) {
        res.send(data);
    });
});

var server = app.listen(app.get('port'), function() {
    console.log("App started on :" + app.get('port'));
});
