const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/nodejs_f8", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect DB succesfully");
    } catch (error) {
        console.log(error);
    }
}
module.exports = { connect };
