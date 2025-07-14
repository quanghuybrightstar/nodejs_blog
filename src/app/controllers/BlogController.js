const BlogModel = require("../models/Blog");
const { generateUniqueSlug } = require("../../utils/helper");

class BlogController {
    // [GET] /
    async index(req, res, next) {
        try {
            // day la connect model
            const blogs = await BlogModel.find().lean();
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

    // [Create] /create
    async create(req, res) {
        res.render("blogs/create");
    }

    // [POST] /store
    async store(req, res, next) {
        try {
            const formData = req.body;
            const slug = await generateUniqueSlug(BlogModel, formData.title);
            formData.slug = slug;

            const blog = new BlogModel(formData);

            await blog.save();

            res.redirect("/blogs/management");
        } catch (err) {
            console.error("Error creating blog:", err);
            next(err);
        }
    }

    // [GET] /management
    async management(req, res, next) {
        try {
            const [blogs, deletedCount] = await Promise.all([
                BlogModel.find({}).lean(),
                BlogModel.countDocumentsWithDeleted({ deleted: true }),
            ]);

            res.render("blogs/management", {
                blogs,
                deletedCount,
            });
        } catch (error) {
            next(error);
        }
    }

    // [Edit] /edit
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

    // [PUT] /update/:id
    async update(req, res, next) {
        const id = req.params.id;
        try {
            const formData = req.body;
            const slug = await generateUniqueSlug(BlogModel, formData.title);
            formData.slug = slug;

            await BlogModel.findOneAndUpdate({ _id: id }, formData);

            res.redirect("/blogs/management");
        } catch (err) {
            console.error("Error updating blog:", err);
            next(err);
        }
    }

    // [DELETE] /delete/:id
    async delete(req, res, next) {
        const id = req.params.id;
        try {
            await BlogModel.delete({ _id: id });
            res.redirect("/blogs/management");
        } catch (err) {
            console.error("Error deleting blog:", err);
            next(err);
        }
    }

    // [GET] /trash
    async trashBlogs(req, res, next) {
        try {
            const blogs = await BlogModel.findWithDeleted({
                deleted: true,
            }).lean();
            res.render("blogs/trash-blogs", {
                blogs,
            });
        } catch (error) {
            next(error);
        }
    }

    // [PATCH] /restore/:id
    async restoreBlog(req, res, next) {
        const id = req.params.id;
        try {
            await BlogModel.restore({ _id: id });
            res.redirect("/blogs/trash-blogs");
        } catch (err) {
            console.error("Error restoring blog:", err);
            next(err);
        }
    }

    // [DELETE] /delete-force/:id
    async deleteForceBlog(req, res, next) {
        const id = req.params.id;
        try {
            await BlogModel.deleteOne({ _id: id });
            res.redirect("/blogs/trash-blogs");
        } catch (err) {
            console.error("Error restoring blog:", err);
            next(err);
        }
    }

    // [DELETE] /deletes
    async deletes(req, res, next) {
        try {
            await BlogModel.delete({ _id: { $in: req.body.blogIds } });
            res.redirect("/blogs/management");
        } catch (err) {
            console.error("Error restoring blog:", err);
            next(err);
        }
    }
}

module.exports = new BlogController();
