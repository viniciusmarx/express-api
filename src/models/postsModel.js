import { ObjectId } from "mongodb";
import connectDatabase from "../config/dbconfig.js";

const client = await connectDatabase(process.env.STRING_CONEXAO);

export async function getPostsFromDatabase() {
	const db = client.db("imersao-instabyte");
	const collection = db.collection("posts");
	return collection.find().toArray();
}

export async function insertPostToDatabase(newPost) {
	const db = client.db("imersao-instabyte");
	const colecao = db.collection("posts");
	return colecao.insertOne(newPost);
}

export async function updatePostToDatabase(post, id) {
	const db = client.db("imersao-instabyte");
	const collection = db.collection("posts");
	const objectId = ObjectId.createFromHexString(id);
	return collection.updateOne({ _id: objectId }, { $set: post });
}
