import { useState } from "react";
import { Form, Input, Button, Card, Alert } from "antd";

export default function QRCodeForm() {
    const [form] = Form.useForm();
    const [qrCode, setQrCode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const generateQRCode = async (values) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/generate-qr", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: values.url }),
            });

            const blob = await response.blob();

            // Create a URL for the blob and trigger download
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "qrcode.pdf"; // Filename for the downloaded PDF
            link.click();
            window.URL.revokeObjectURL(url);

        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="QR Code Generator" style={{ maxWidth: 400, margin: "auto", marginTop: "2rem" }}>
            <Form form={form} onFinish={generateQRCode}>
                <Form.Item
                    name="url"
                    rules={[{ required: true, message: "Please enter a valid URL!" }]}
                >
                    <Input placeholder="Enter URL" />
                </Form.Item>
                {error && (
                    <Alert message={error} type="error" showIcon style={{ marginBottom: "1rem" }} />
                )}
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Generate QR Code
                    </Button>
                </Form.Item>
            </Form>

        </Card>
    );
}
