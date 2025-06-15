const BlogModel = require("../models/Blog");

class SiteController {
    // [GET] /
    async index(req, res) {
        try {
            const blogs = await BlogModel.find({});
            res.json(blogs);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
        // res.render("home");
    }

    // [GET] /search
    search(req, res) {
        res.render("search");
    }
}

module.exports = new SiteController();
