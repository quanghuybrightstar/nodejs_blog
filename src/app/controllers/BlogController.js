const BlogModel = require("../models/Blog");
const { generateUniqueSlug } = require("../../utils/helper");

class BlogController {
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
    }

    // [GET] /:slug
    async detail(req, res, next) {
        const slug = req.params.slug;

        try {
            const blogDetail = await BlogModel.findOne({ slug }).lean();
            res.render("blogs/detail", {
                blogDetail,
            });
        } catch (error) {
            next(error);
        }
    }

    // [Create] /blog/create
    async create(req, res) {
        res.render("blogs/create");
    }

    // [POST] /blog/store
    async store(req, res, next) {
        try {
            const formData = req.body;
            const slug = await generateUniqueSlug(BlogModel, formData.title);
            formData.slug = slug;

            const blog = new BlogModel(formData);

            await blog.save();

            res.redirect("/blogs/management");
        } catch (err) {
            console.error("Lỗi lưu blog:", err);
            next(err);
        }
    }

    // [GET] /blogs/management
    async management(req, res, next) {
        try {
            const blogs = await BlogModel.find({}).lean();
            res.render("blogs/management", {
                blogs,
            });
        } catch (error) {
            next(error);
        }
    }

    // [Create] /blog/create
    async edit(req, res) {
        const id = req.params.id;

        try {
            const blogDetail = await BlogModel.findOne({ _id: id }).lean();

            res.render("blogs/edit", {
                blog: blogDetail,
            });
        } catch (error) {
            next(error);
        }
    }

    // [POST] /blog/store
    async update(req, res, next) {
        const id = req.params.id;
        try {
            const formData = req.body;
            const slug = await generateUniqueSlug(BlogModel, formData.title);
            formData.slug = slug;

            await BlogModel.findOneAndUpdate({ _id: id }, formData);

            res.redirect("/blogs/management");
        } catch (err) {
            console.error("Lỗi lưu blog:", err);
            next(err);
        }
    }
}

module.exports = new BlogController();
