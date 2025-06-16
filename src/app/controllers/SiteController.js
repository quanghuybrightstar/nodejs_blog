const BlogModel = require("../models/Blog");

class SiteController {
    // [GET] /
    async index(req, res, next) {
        try {
            // day la connect model
            const blogs = await BlogModel.find({}).lean();
            // Day la view
            res.render("home", {
                blogs,
            });
        } catch (error) {
            next(error);
        }
        // res.render("home");
    }

    // [GET] /search
    search(req, res) {
        res.render("search");
    }
}

module.exports = new SiteController();
