const Course = require("../models/courseModel");
const { multipleMongooseObject } = require("../utils/mongoose");

class MeController {
    // get /me/stored/courses
    storedCourse(req, res, next) {
        let courseQuery = Course.find({});
        // eslint-disable-next-line no-prototype-builtins
        if (req.query.hasOwnProperty("_sort")) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render("me/storedCourse", {
                    deletedCount,
                    courses: multipleMongooseObject(courses),
                });
            })
            .catch((err) => next(err));
    }

    trashCourse(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render("me/trashCourse", {
                    courses: multipleMongooseObject(courses),
                })
            )
            .catch((err) => next(err));
    }
}

module.exports = new MeController();
