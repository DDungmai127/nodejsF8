const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);

mongoose.plugin(slug);
const CourseSchema = new mongoose.Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        slug: { type: String, slug: "name" },
        level: { type: String },
        videoId: { type: String, required: true, unique: true },
    },
    {
        _id: false,
        timestamps: true,
    }
);
// custom query helper
CourseSchema.query.sortable = function (req) {
    // eslint-disable-next-line no-prototype-builtins
    if (req.query.hasOwnProperty("_sort")) {
        const isValidType = ["asc", "desc"].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : "desc",
        });
    }
    return this;
};

CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, {
    overrideMethods: true,
    deletedAt: true, // thêm thời gian xoá
});
const Course = mongoose.model("Course", CourseSchema);
// Course này được moongoose xử lý và đưa về một collection là courses
module.exports = Course;
