import React, {useState} from 'react';
import {Form, Input, Upload, Button, message, Image} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import App from "../layouts/app";
import {addBlog} from "../../../store/blog/actions";
import {useDispatch} from "react-redux";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import {compressImage} from "../../../utils/utils";

const ReactQuill = dynamic(import('react-quill'), {ssr: false})

const AddBlogPage = () => {
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const normFile = (e) => {
        console.log(e)
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('You can only upload image files!');
        }
        return isImage || Upload.LIST_IGNORE;
    };
    const handleAvatarChange = async (info) => {
        const file = info.fileList[0].originFileObj;
        if (file instanceof Blob) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('title_en', values.title_en);
        formData.append('title_ru', values.title_ru);
        formData.append('title', values.title);
        formData.append('content', values.content);

        formData.append('content_en', values.content_en);
        if (imageFiles.length > 0) {
            imageFiles.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });
        }
        formData.append('content_ru', values.content_ru);

        dispatch(addBlog.request(formData));
        form.resetFields();
        setAvatarFile("")
        setAvatarPreview("")
        message.success('Blog successfully added!');
    };


    const handleImagesChange = async (info) => {
        const fileList = [...info.fileList];
        const compressedImages = [];
        for (const file of fileList) {
            const compressedImage = await compressImage(file.originFileObj);
            compressedImages.push(compressedImage);
        }
        setImageFiles(compressedImages);
        setImagePreviews(compressedImages.map(file => URL.createObjectURL(file)));
    };

    return (
        <App>
            <h1>Add Blog</h1>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Title" name="title" rules={[{required: true, message: 'Please enter the title'}]}>
                    <Input placeholder="Enter the title"/>
                </Form.Item>
                <Form.Item label="Title English" name="title_en"
                           rules={[{required: true, message: 'Please enter the title'}]}>
                    <Input placeholder="Enter the title"/>
                </Form.Item>
                <Form.Item label="Title Russian" name="title_ru"
                           rules={[{required: true, message: 'Please enter the title'}]}>
                    <Input placeholder="Enter the title"/>
                </Form.Item>
                <Form.Item label="Images" name="images"
                           valuePropName="fileList"
                           getValueFromEvent={normFile}
                >
                    <Upload
                        accept="image/*"
                        multiple
                        fileList={imageFiles.map((file, index) => ({uid: index, originFileObj: file}))}
                        onChange={handleImagesChange}
                        beforeUpload={beforeUpload}
                        listType="picture"
                        name="images"
                    >
                        <Button icon={<UploadOutlined/>}>Upload Images</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Content" name="content">
                    <ReactQuill/>
                </Form.Item>
                <Form.Item label="Content English" name="content_en">
                    <ReactQuill/>
                </Form.Item>
                <Form.Item label="Content Russian" name="content_ru">
                    <ReactQuill/>
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

export default AddBlogPage;