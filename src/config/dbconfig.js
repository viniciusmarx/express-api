import { MongoClient } from "mongodb";

export default async function connectDatabase(stringConexao) {
	let client;
	try {
		client = new MongoClient(stringConexao);
		console.log("Connecting to the database cluster...");
		await client.connect();
		console.log("Successfully connected to MongoDB Atlas!");
		return client;
	} catch (error) {
		console.error("Failed to connect to the database", error);
		process.exit();
	}
}
