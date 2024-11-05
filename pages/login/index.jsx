import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState(null);

    const signIn = async (email, password) => {
        try {
            const response = await fetch(process.env.API_URL+"/auth/signIn", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors.email[0]);
            }

            const data = await response.json();

            if (data.status) {
                localStorage.setItem('access_token', data?.access_token)
                localStorage.setItem('name', data?.user?.name);
                localStorage.setItem('role', data?.user?.role_id);

                const nextUrl = searchParams.get("next");
                router.push(nextUrl ?? "/admin");

            } else {
                console.log('error')
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const onFinish = (values) => {
        const username = values.username;
        const password = values.password;
        setError(null); // Clear previous errors
        signIn(username, password);
    };

    return (
        <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ width: '300px', margin: '0 auto', marginTop: '100px' }}
        >
            <Form.Item
                label="Username"
                name="username"
                validateStatus={error ? 'error' : ''}
                help={error? "Սխալ էլ-հասցե կամ ծածկագիր" : ""}
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
