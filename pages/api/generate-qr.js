import QRCode from "qrcode";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        try {
            const qrCode = await QRCode.toDataURL(url); // Generate QR code
            return res.status(200).json({ qrCode });
        } catch (error) {
            return res.status(500).json({ error: "Failed to generate QR code" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
