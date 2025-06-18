const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");

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

// Template engine
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
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
