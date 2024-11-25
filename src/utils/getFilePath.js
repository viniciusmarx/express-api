import fs from "fs";
import path from "path";

export default async function getFilePath(fileName) {
	try {
		const files = await fs.promises.readdir("./uploads");
		const matchingFile = files.find((file) => path.parse(file).name === fileName);

		if (matchingFile) {
			return matchingFile;
		} else {
			console.log("File not found.");
		}
	} catch (error) {
		console.error("Error reading a directory:", error);
	}
}
