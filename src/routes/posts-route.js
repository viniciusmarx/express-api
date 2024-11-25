import express from "express";
import multer from "multer";
import cors from "cors";
import { getAllPosts, createPost, uploadImage, updateNewPost } from "../controllers/posts-controller.js";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

const routes = (app) => {
	app.use(express.json());

	app.get("/posts", getAllPosts);

	app.post("/posts", createPost);

	app.post("/upload", upload.single("imagem"), uploadImage);

	app.put("/upload/:id", updateNewPost);
};

export default routes;
