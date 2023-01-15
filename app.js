const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const methodOverride = require("method-override");
const db = require("./server");
const route = require("./routes/routesAll");
const sortMiddleware = require("./utils/sortMiddleware");

const port = 3000;
const app = express();
// cho phép gửi dữ liệu thông qua from, action
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(sortMiddleware);
app.use(
    methodOverride((req, res) => {
        if (req.body && typeof req.body === "object" && "_method" in req.body) {
            // look in urlencoded POST bodies and delete it
            const method = req.body._method;
            delete req.body._method;
            return method;
        }
    })
);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.engine(
    ".hbs",
    engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                //Dòng này để kiểm tra xem cái cột mà mình đang bấm là loại nào, nếu cùng một thì đổi kiểu xếp, nếu không thì thôi
                const sortType = field === sort.column ? sort.type : "default";
                const icons = {
                    default: "oi oi-elevator",
                    asc: "oi oi-sort-ascending",
                    desc: "oi oi-sort-descending",
                };

                const types = {
                    default: "desc",
                    acs: "desc",
                    desc: "asc",
                };
                const icon = icons[sortType];
                const type = types[sortType];
                return `<a href="/me/stored/courses?_sort&column=${field}&type=${type}">
                <span class="${icon}"></span>
            </a>`;
            },
        },
    })
);

app.set("view engine", ".hbs");
app.set("views", "./views");
route(app);
app.listen(port, () => console.log(`App listening in http://127.0.0.1:${port}`));
db.connect();
