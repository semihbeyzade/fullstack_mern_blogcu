import express from "express";
import { getPosts, createPost, updatePost, getSinglePost, deletePost } from "../controllers/posts.js"

const router = express.Router();

// http://localhost:7000/posts
// GET POST DELETE UPDATE PATCH
router.get("/", getPosts)
router.get("/:id", getSinglePost)
router.post("/", createPost);
router.patch("/:id", updatePost)
router.delete("/:id", deletePost)

export default router;