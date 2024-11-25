import fs from "fs";
import path from "path";
import getFilePath from "../utils/getFilePath.js";
import { getPostsFromDatabase, insertPostToDatabase, updatePostToDatabase } from "../models/postsModel.js";
import generateDescriptionGemini from "../services/gemini.js";

export async function getAllPosts(req, res) {
	try {
		const posts = await getPostsFromDatabase();
		return res.status(200).json(posts);
	} catch (error) {
		console.error(error.messae);
		res.status(500).json({ Erro: "Request failed" });
	}
}

export async function createPost(req, res) {
	const newPost = req.body;
	try {
		const postCreated = await insertPostToDatabase(newPost);
		return res.status(200).json(postCreated);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ Erro: "Request failed" });
	}
}

export async function uploadImage(req, res) {
	const newPost = {
		description: "",
		imgUrl: req.file.originalname,
		alt: "",
	};
	try {
		const postCreated = await insertPostToDatabase(newPost);
		const fileExtension = path.extname(req.file.path);
		const imgUpdated = `uploads/${postCreated.insertedId}${fileExtension}`;
		fs.renameSync(req.file.path, imgUpdated);
		res.status(200).json(postCreated);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ Erro: "Request failed" });
	}
}

export async function updateNewPost(req, res) {
	try {
		const id = req.params.id;
		const filePath = await getFilePath(id);
		if (!filePath) {
			return res.status(400).json({ Erro: "File not found" });
		}
		const url = `http://localhost:3000/${filePath}`;

		const imgBuffer = fs.readFileSync(`uploads/${filePath}`);
		const description = await generateDescriptionGemini(imgBuffer);
		const post = {
			description: description,
			imgUrl: url,
			alt: req.body.alt,
		};
		const postUpdated = await updatePostToDatabase(post, id);
		return res.status(200).json(postUpdated);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ Erro: "Request failed" });
	}
}
