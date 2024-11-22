import fs from "fs";
import path from "path";

export default function handler(req, res) {
    try {
        if (req.method === "POST") {
            const data = req.body;

            if (!data || !data.name || !data.email) {
                return res.status(400).json({ message: "Invalid data format" });
            }

            const filePath = path.join(process.cwd(), "data", "data.json");

            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, JSON.stringify([], null, 2)); // Initialize file with an empty array
            }

            const fileData = fs.readFileSync(filePath, "utf-8");
            const existingData = JSON.parse(fileData);

            existingData.push(data);
            fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

            res.status(200).json({ message: "Data saved successfully!" });
        } else {
            res.status(405).json({ message: "Method not allowed" });
        }
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
