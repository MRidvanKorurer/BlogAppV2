const Blog = require("../models/blog");



module.exports.createBlog = async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);

        return res.render("Blog", {
            message: "Blog create işlemi başarılı",
            data: newBlog
        });
    } catch (error) {
        return res.render("Error");
    }
}




module.exports.updateBlog = async (req, res) => {
    try {
        const {id} = req.params;

        const blog = await Blog.findByIdAndUpdate(id, req.body, {new: true});

        return res.render("Blog", {
            message: "Blog update işlemi başarılı",
            data: blog
        });
    } catch (error) {
        return res.render("Error");
    }
}

module.exports.deleteBlog = async (req, res) => {
    try {
        const {id} = req.params;

        const blog = await Blog.findByIdAndDelete(id);

        return res.render("Blog", {
            message: "Blog delete işlemi başarılı",
            data: blog
        });
    } catch (error) {
        return res.render("Error");
    }
}




module.exports.singleBlog = async (req, res) => {
    try {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.render("Error", { message: "Geçersiz blog ID" });
        }
        const blog = await Blog.findById(id);

        return res.render("Blog", {
            message: "Tekli blog çekme işlemi başarılı",
            data: blog
        });
    } catch (error) {
        return res.render("Error");
    }
}
module.exports.allBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();

        return res.render("Blog", {
            message: "Blogları çekme işlemi başarılı",
            data: blogs
        });
    } catch (error) {
        return res.render("Error");
    }
}