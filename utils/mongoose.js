module.exports = {
    multipleMongooseObject: function (mongoObj) {
        return mongoObj.map((el) => el.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
