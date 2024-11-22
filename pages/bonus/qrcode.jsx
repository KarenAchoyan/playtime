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

            const data = await response.json();

            if (response.ok) {
                setQrCode(data.qrCode); // Store the generated QR code
            } else {
                setError(data.error || "Failed to generate QR code.");
            }
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

            {qrCode && (
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <img src={qrCode} alt="QR Code" style={{ maxWidth: "100%" }} />
                    <a
                        href={qrCode}
                        download="qrcode.png"
                        style={{
                            display: "inline-block",
                            marginTop: "1rem",
                            padding: "0.5rem 1rem",
                            backgroundColor: "#52c41a",
                            color: "#fff",
                            borderRadius: "4px",
                            textDecoration: "none",
                        }}
                    >
                        Download QR Code
                    </a>
                </div>
            )}
        </Card>
    );
}
