import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Upload, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import App from "../layouts/app";
import { useDispatch } from "react-redux";
import { addBrand } from "../../../store/brand/actions";

const AddBrand = () => {
    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (info) => {
        const file = info.fileList[0]?.originFileObj;
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('name_ru', values.name_ru);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        dispatch(addBrand.request(formData));  // Dispatch the addBrand action
        form.resetFields();
        setImageFile(null);
        setImagePreview(null);
        message.success('Brand successfully added!');
    };

    return (
        <App>
            <h1>Add Brand</h1>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter the brand name' }]}
                >
                    <Input placeholder="Enter the brand name" />
                </Form.Item>

                <Form.Item
                    label="Name (RU)"
                    name="name_ru"
                    rules={[{ required: true, message: 'Please enter the brand name in Russian' }]}
                >
                    <Input placeholder="Enter the brand name in Russian" />
                </Form.Item>

                <Form.Item label="Image" name="image">
                    <Upload
                        accept="image/*"
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleImageChange}
                    >
                        {imagePreview ? (
                            <Image
                                preview={false}
                                src={imagePreview}
                                alt="Brand Image"
                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                            />
                        ) : (
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        )}
                    </Upload>
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

export default AddBrand;
