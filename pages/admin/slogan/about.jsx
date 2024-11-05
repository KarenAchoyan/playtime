import React, {useState, useEffect} from 'react';
import {Form, Input, Button, message, Upload, Image} from 'antd';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import { UploadOutlined} from "@ant-design/icons";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import {getSlogan, updateSlogan} from "../../../store/slogan/actions";

const ReactQuill = dynamic(import('react-quill'), {ssr: false})


const About = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const slogan = useSelector((state) => state.slogan.about);

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);


    useEffect(() => {
        dispatch(getSlogan.request());
    }, [dispatch, form]);


    const handleSubmit = async (values) => {
        const formData = new FormData();
        if (avatarFile !== null) {
            formData.append('avatar1', avatarFile);
        }
        formData.append('content_1', values.content_1);

        formData.append('color', values.color);
        formData.append('content_1_en', values.content_1_en);
        formData.append('content_1_ru', values.content_1_ru);

        dispatch(updateSlogan.request(formData));
        message.success('About information updated successfully!');
    };

    useEffect(() => {
        if (slogan) {
            setAvatarPreview(process.env.IMAGE_URL2  + slogan.image1)

            form.setFieldsValue({
                content_1: slogan.content_1,
                content_1_en: slogan.content_1_en,
                content_1_ru: slogan.content_1_ru,
                color: slogan.color,
            });
        }
    }, [slogan, form]);
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
    return (
        <App>
            <div>
                <h1>Update About Information</h1>
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item label="Avatar" name="avatar1">
                        <Upload
                            accept="image/*"
                            showUploadList={false}
                            beforeUpload={() => false} // Disable automatic upload
                            fileList={avatarFile ? [avatarFile] : []}
                            onChange={handleAvatarChange}
                            name={'avatar1'}
                        >
                            {avatarPreview ? (
                                <Image
                                    preview={false}
                                    src={avatarPreview}
                                    alt="Avatar"
                                    style={{maxWidth: '100%', maxHeight: '200px'}}
                                />
                            ) : (
                                <Button icon={<UploadOutlined/>}>Upload Avatar</Button>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item label="Color" name="color">
                        <Input type="color" />
                    </Form.Item>
                    <Form.Item label="Content" name="content_1">
                        <ReactQuill/>
                    </Form.Item>
                    <Form.Item label="Content English" name="content_1_en">
                        <ReactQuill/>
                    </Form.Item>
                    <Form.Item label="Content Russian" name="content_1_ru">
                        <ReactQuill/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </App>
    );
};

export default About;