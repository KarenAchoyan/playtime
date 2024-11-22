// components/UserForm.js
import { Form, Input, Button, message } from "antd";
import { useState } from "react";

export default function Index() {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        console.log(values)

        try {
            const response = await fetch("/api/saveData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const result = await response.json();
            if (response.ok) {
                message.success(result.message);
            } else {
                message.error(result.message || "Failed to submit data");
            }
        } catch (error) {
            message.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            name="userForm"
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 400, margin: "0 auto" }}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
            >
                <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                ]}
            >
                <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
