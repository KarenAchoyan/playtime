import React, {useState, useEffect} from 'react';
import {Form, Input, Button, message, Upload, Image} from 'antd';
import App from "../layouts/app";
import {getAbout, updateAbout} from "../../../store/about/actions";
import {useDispatch, useSelector} from "react-redux";
import {PlusOutlined, UploadOutlined} from "@ant-design/icons";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(import('react-quill'), {ssr: false})


const About = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const about = useSelector((state) => state.contact.about);

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const [avatar2File, setAvatar2File] = useState(null);
    const [avatar2Preview, setAvatar2Preview] = useState(null);


    useEffect(() => {
        dispatch(getAbout.request());
    }, [dispatch, form]);


    const handleSubmit = async (values) => {
        const formData = new FormData();
        if (avatarFile !== null) {
            formData.append('avatar1', avatarFile);
        }
        if (avatar2File !== null) {
            formData.append('avatar2', avatar2File);
        }
        formData.append('content_1', values.content_1);
        formData.append('content_2', values.content_2);
        formData.append('content_1_en', values.content_1_en);
        formData.append('content_1_ru', values.content_1_ru);
        formData.append('content_2_en', values.content_2_en);
        formData.append('content_2_ru', values.content_2_ru);

        dispatch(updateAbout.request(formData));
        message.success('About information updated successfully!');
    };

    useEffect(() => {
        if (about) {
            setAvatarPreview(process.env.IMAGE_URL2  + about.image1)
            setAvatar2Preview(process.env.IMAGE_URL2  + about.image2)

            form.setFieldsValue({
                content_1: about.content_1,
                content_1_en: about.content_1_en,
                content_1_ru: about.content_1_ru,
                content_2: about.content_2,
                content_2_en: about.content_2_en,
                content_2_ru: about.content_2_ru,
            });
        }
    }, [about,form]);
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
    const handleAvatar2Change = async (info) => {
        const file = info.fileList[0].originFileObj;
        if (file instanceof Blob) {
            setAvatar2File(file);
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar2Preview(reader.result);
            };
            reader.readAsDataURL(file);
            console.log(file)
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
                                    src={avatarPreview}
                                    alt="Avatar"
                                    style={{maxWidth: '100%', maxHeight: '200px'}}
                                />
                            ) : (
                                <Button icon={<UploadOutlined/>}>Upload Avatar</Button>
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Avatar" name="avatar2">
                        <Upload
                            accept="image/*"
                            showUploadList={false}
                            beforeUpload={() => false} // Disable automatic upload
                            fileList={avatar2File ? [avatar2File] : []}
                            onChange={handleAvatar2Change}
                            name={'avatar2'}
                        >
                            {avatarPreview ? (
                                <Image
                                    preview={false}
                                    src={avatar2Preview}
                                    alt="Avatar"
                                    style={{maxWidth: '100%', maxHeight: '200px'}}
                                />
                            ) : (
                                <Button icon={<UploadOutlined/>}>Upload Avatar</Button>
                            )}
                        </Upload>
                        <hr/>
                        <br/>
                        <Form.Item label="Content" name="content_1">
                            <ReactQuill/>
                        </Form.Item>
                        <Form.Item label="Content English" name="content_1_en">
                            <ReactQuill/>
                        </Form.Item>
                        <Form.Item label="Content Russian" name="content_1_ru">
                            <ReactQuill/>
                        </Form.Item>
                        <hr/>
                        <br/>
                        <Form.Item label="Content" name="content_2">
                            <ReactQuill/>
                        </Form.Item>
                        <Form.Item label="Content English" name="content_2_en">
                            <ReactQuill/>
                        </Form.Item>
                        <Form.Item label="Content Russian" name="content_2_ru">
                            <ReactQuill/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form.Item>

                </Form>
            </div>
        </App>
    );
};

export default About;