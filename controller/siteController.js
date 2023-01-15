const Course = require("../models/courseModel");
const { multipleMongooseObject } = require("../utils/mongoose");

class SiteController {
    home(req, res, next) {
        Course.find({})
            .then((courses) => {
                courses = multipleMongooseObject(courses);
                res.render("home", {
                    courses,
                });
            })
            .catch((err) => next(err));
    }

    search(req, res) {
        res.render("search");
    }
}

module.exports = new SiteController();
