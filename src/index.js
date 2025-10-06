const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const moment = require("moment");

// middlewares
const SortMiddleware = require("./app/middlewares/SortMiddleware.js");

// Dùng để override lại method -> do form chi support GET/POST
const methodOverride = require("method-override");
const app = express();
const port = 3000;

const route = require("./routes");
const db = require("./config/db");

// Connect to DB
db.connect();

// Static file
app.use(express.static(path.join(__dirname, "public")));

// Sử dụng middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Http logger
app.use(morgan("combined"));

// Method Overrid
app.use(methodOverride("_method"));

// Middleware
app.use(SortMiddleware);

// Template engine
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
            formatLocal: (utcString, fmt = "HH:mm DD/MM/YYYY") => {
                return moment(utcString).format(fmt);
            },
            sortable: (field, sort) => {
                // Define icon, nextType, label
                const isCurrentField = field === sort.col;
                const currentType = isCurrentField ? sort.type : "default";

                // Mapping for labels and types
                const sortConfig = {
                    default: { label: "mặc định", nextType: "desc" },
                    asc: { label: "tăng dần", nextType: "desc" },
                    desc: { label: "giảm dần", nextType: "asc" },
                };

                const config = sortConfig[currentType];
                const icon =
                    currentType === "asc"
                        ? "↑"
                        : currentType === "desc"
                          ? "↓"
                          : "";

                return `<a href="?_sort&col=${field}&type=${config.nextType}" title="Sắp xếp ${config.label}">
                        ${icon} ${config.label}
                    </a>`;
            },
        },
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
