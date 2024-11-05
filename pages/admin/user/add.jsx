import React, {useEffect} from 'react';
import {Card, Form, Input, Button, message, Select} from 'antd';
import App from "../layouts/app";
import {addCategory, getCategories} from "store/category/actions";
import {useDispatch, useSelector} from "react-redux";
import {signUp} from "../../../store/user/actions";

const {Option} = Select;

const Add = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const handleSubmit = async (values) => {
        try {
            await dispatch(signUp.request(values));
            message.success('User created');

            form.resetFields();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred';
            message.error(errorMessage);
        }
    };

    return (
        <App>
            <Card title="Create User">
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter the name'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter the email'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{required: true, message: 'Please enter the name'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="role_id"
                        label="Role"
                        rules={[{ required: true, message: 'Please select the role' }]}
                    >
                        <Select placeholder="Select a role">
                            <Option value="1">Admin</Option>
                            <Option value="3">Adder</Option>
                            <Option value="2">Seller</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </App>
    );
};

export default Add;