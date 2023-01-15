const meRouter = require("./meRoute");
const siteRouter = require("./sitesRoute");
const courseRouter = require("./courseRoute");

function route(app) {
    app.use("/courses", courseRouter);
    app.use("/me", meRouter);
    app.use("/", siteRouter);
}

module.exports = route;
