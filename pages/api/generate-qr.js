import QRCode from "qrcode";
import PDFDocument from "pdfkit";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        try {
            // Generate QR Code as a Data URL
            const qrCode = await QRCode.toDataURL(url);

            // Set up PDF generation
            const doc = new PDFDocument({
                size: [58 * 2.83465, 40 * 2.83465], // Convert mm to points (1mm = 2.83465 points)
                margins: { top: 0, bottom: 0, left: 0, right: 0 },
            });

            // Set the response headers for a PDF
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", 'attachment; filename="qrcode.pdf"');

            // Stream PDF to response
            doc.pipe(res);

            // Add QR Code image to PDF
            doc.image(qrCode, {
                fit: [58 * 2.83465, 40 * 2.83465], // Fit image to 58mm x 40mm
                align: "center",
                valign: "center",
            });

            // Finalize PDF
            doc.end();
        } catch (error) {
            console.error("Error generating QR code PDF:", error);
            return res.status(500).json({ error: "Failed to generate QR code PDF" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
