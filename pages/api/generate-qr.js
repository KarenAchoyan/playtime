import QRCode from "qrcode";
import PDFDocument from "pdfkit";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        try {
            // Generate QR code as a Data URL
            const qrCodeDataURL = await QRCode.toDataURL(url);

            // Create a PDF document
            const doc = new PDFDocument({
                size: [58 * 2.83465, 40 * 2.83465], // Size in points (mm to points conversion)
                margin: 10,
            });

            // Write the PDF to a buffer
            const buffers = [];
            doc.on("data", (chunk) => buffers.push(chunk));
            doc.on("end", () => {
                const pdfData = Buffer.concat(buffers);
                res.writeHead(200, {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": 'attachment; filename="qrcode.pdf"',
                });
                res.end(pdfData);
            });

            // Add the QR code to the PDF
            doc.image(qrCodeDataURL, 28, 10, { width: 100 });

            // Add the timestamp at the bottom of the PDF
            let c=  Date.now().toString();
            const timestamp = c.slice(c.length - 4);
            doc.fontSize(11).text(`Code: ${timestamp}`, {
                align: "center",
                baseline: "bottom",
            })

            // Finalize the PDF
            doc.end();
        } catch (error) {
            console.error("Error generating PDF:", error);
            return res.status(500).json({ error: "Failed to generate QR code PDF" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
