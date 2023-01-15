const Course = require("../models/courseModel");
const { multipleMongooseObject, mongooseToObject } = require("../utils/mongoose");

class CourseCotroller {
    show(req, res) {
        Course.findOne({ slug: req.params.slug, deleted: false })
            .then((course) =>
                res.render("courses/show", {
                    course: mongooseToObject(course),
                })
            )
            .catch((err) => res.status(404).send(`Error: ${err}`));
    }

    // get courses/create
    create(req, res, next) {
        res.render("courses/create");
    }

    // post : /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${formData.videoId}/hqdefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect("/me/stored/courses"))
            .catch((err) => next(err));
    }

    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render("courses/edit", {
                    course: mongooseToObject(course),
                })
            )
            .catch((err) => next(err));
    }

    // put : /courses/:id
    update(req, res, next) {
        // res.json(req.body);
        req.body.updatedAt = Date.now();
        Course.updateOne({ _id: req.params.id }, req.body).then(() =>
            res.redirect("/me/stored/courses")
        );
    }

    // [delete]  /courses/:id
    destroy(req, res, next) {
        Course.delete({
            _id: req.params.id,
        }).then(() => res.redirect("/me/stored/courses"));
    }

    forcedDestroy(req, res, next) {
        Course.deleteOne({
            _id: req.params.id,
        }).then(() => res.redirect("/me/stored/courses"));
    }

    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case "delete":
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;

            default:
                res.json({ message: "Action is invalid" });
        }
    }
}

module.exports = new CourseCotroller();
