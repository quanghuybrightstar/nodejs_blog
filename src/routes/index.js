const newsRouter = require("./news");
const siteRouter = require("./site");
const blogRouter = require("./blogs");

const routes = (app) => {
    // Chia MVC
    app.use("/blogs", blogRouter);

    app.use("/news", newsRouter);

    app.use("/", siteRouter);

    // app.get("/news", (req, res) => {
    //   res.render("news");
    // });

    // Local host --- Hosting

    // Action ---> Disptacher ---> Function handler

    app.post("/search", (req, res) => {
        // Express nhận được req -> nhưng chưa lưu vào biến body
        // -> cần middleware -> thành phần trung gian
        // tại sao query lại lấy được luôn -> do express tích hợp sẵn middleware cho query parameters
        // -> cần apply vào middle ware cho req.body -> express.urlencoded/json ()
        console.log("req =======", req.body);

        res.send("search");
    });
};

module.exports = routes;
