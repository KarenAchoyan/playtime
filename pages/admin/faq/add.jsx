import React, {useState} from 'react';
import {Form, Input, Upload, Button, message} from 'antd';
import App from "../layouts/app";
import {insertFaq} from "../../../store/faq/actions";
import {useDispatch} from "react-redux";

const Add = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();


    const handleSubmit = (values) => {
        dispatch(insertFaq.request(values));
        form.resetFields();
        message.success('Faq successfully added!');
    };

    return (
        <App>
            <h1>Add Faq</h1>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Question" name="question"
                           rules={[{required: true, message: 'Please enter the question'}]}>
                    <Input placeholder="Enter the question"/>
                </Form.Item>
                <Form.Item label="Question English" name="question_en"
                           rules={[{required: true, message: 'Please enter the question'}]}>
                    <Input placeholder="Enter the question"/>
                </Form.Item>
                <Form.Item label="Question Russian" name="question_ru"
                           rules={[{required: true, message: 'Please enter the question'}]}>
                    <Input placeholder="Enter the question"/>
                </Form.Item>

                <Form.Item label="Answer" name="answer" rules={[{required: true, message: 'Please enter the answer'}]}>
                    <Input.TextArea placeholder="Enter the answer"/>
                </Form.Item>
                <Form.Item label="Answer" name="answer_ru"
                           rules={[{required: true, message: 'Please enter the answer'}]}>
                    <Input.TextArea placeholder="Enter the answer in Russian"/>
                </Form.Item>
                <Form.Item label="Answer English" name="answer_en"
                           rules={[{required: true, message: 'Please enter the answer in English'}]}>
                    <Input.TextArea placeholder="Enter the answer in English"/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </App>
    );
};

export default Add;