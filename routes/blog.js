const express = require("express");
const { singleBlog, allBlogs, createBlog, updateBlog, deleteBlog } = require("../controllers/blog");

const router = express.Router();

router.get("/", allBlogs);router.get("/:id", singleBlog);router.post("/:id", createBlog);router.put("/:id", updateBlog);router.delete("/:id", deleteBlog);

module.exports = router;
