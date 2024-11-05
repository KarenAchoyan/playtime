import React, {useEffect, useState} from 'react';
import {Button, Form, Image, Input, message, Modal, Popconfirm, Select, Space, Table, Upload} from 'antd';
import {DeleteOutlined, EditOutlined, UploadOutlined} from '@ant-design/icons';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {deleteSlide, getSlides, updateSlide, updateSlideInterval} from "../../../store/slides/actions";

const {Option} = Select;

const AllCategoryPage = () => {
    const dispatch = useDispatch();
    const slides = useSelector((state) => state.slide.slides.slides);

    const [editingProduct, setEditingProduct] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);


    const [form] = Form.useForm();
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const [interval, setInterval] = useState(1000)


    useEffect(() => {
        dispatch(getSlides.request());
    }, [dispatch]);

    useEffect(() => {
        setInterval(4000)
    }, [slides]);

    const handleDeleteCategory = (id) => {
        dispatch(deleteSlide.request(id));
        message.success('Product deleted successfully');
    };

    function handleEditCategory(id) {
        const slide = slides.find((slide) => slide.id === id);
        setEditingProduct(slide);
        setAvatarPreview(process.env.IMAGE_URL2  + slide.image)
        form.setFieldsValue({
            url: slide.url
        });
        setEditModalVisible(true);
    }

    async function handlerChangePriority(e, slide) {
        let id = slide.id
        try {
            const response = await fetch(`${process.env.API_URL}/priority/${id}/${e}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Failed to update priority');
            }else{
                dispatch(getSlides.request());
            }
        } catch (error) {
            console.error('Error updating priority:', error.message);
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <div>
                    <Image preview={false} src={process.env.IMAGE_URL2  + image} style={{width: '150px'}} alt=""/>
                </div>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <Space size="small">

                    <Popconfirm
                        title="Are you sure you want to delete this category?"
                        onConfirm={() => handleDeleteCategory(id)}
                        okText="Yes"
                        cancelText="No"
                        key={`delete_${id}`}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined/>} key={`confirm_${id}`}>
                            Delete
                        </Button>


                    </Popconfirm>
                    <Button
                        type="primary"
                        icon={<EditOutlined/>}
                        onClick={() => handleEditCategory(id)}
                        key={`edit_${id}`}
                    >
                        Edit
                    </Button>

                </Space>
            ),
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority, id) => (
                <div>
                    <Form.Item
                        name="priority"
                        label={priority}
                    >
                        <Select value={priority} onChange={e => handlerChangePriority(e, id)}>
                            <Option value={0}>0</Option>
                            <Option value={1}>1</Option>
                            <Option value={2}>2</Option>
                            <Option value={3}>3</Option>
                            <Option value={4}>4</Option>
                            <Option value={5}>5</Option>
                            <Option value={6}>6</Option>
                            <Option value={7}>7</Option>
                        </Select>
                    </Form.Item>
                </div>
            )

        }
    ];

    function handlerSubmit(values) {
        const formData = new FormData();
        formData.append('image', avatarFile);
        formData.append('url', values.url);
        formData.append('id', editingProduct.id);

        dispatch(updateSlide.request({id: editingProduct.id, formData}));
        message.success('Slide successfully updated!');
    }

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

    function handleChange(value) {
        const formData = new FormData();
        formData.append('interval', value);
        setInterval(value)
        dispatch(updateSlideInterval.request(formData))
    }

    return (
        <App>
            <h1>All Slides</h1>

            <div style={{margin: '24px'}}>
                <label for="">Change interval ({interval})</label>
                <br/>
                <Select
                    placeholder="Select an interval"
                    onChange={handleChange}
                >
                    <Option value="1000">1000</Option>
                    <Option value="2000">2000</Option>
                    <Option value="3000">3000</Option>
                    <Option value="4000">4000</Option>
                    <Option value="5000">5000</Option>
                </Select>
                <Table dataSource={slides} columns={columns} rowKey="id"/>
                <Modal
                    title="Edit Product"
                    visible={editModalVisible}
                    onCancel={() => setEditModalVisible(false)}
                    footer={null}
                >
                    <Form form={form} onFinish={handlerSubmit}>
                        <Form.Item
                            label="Url"
                            name="url"
                            rules={[{required: true, message: 'Please enter the url'}]}
                        >
                            <Input placeholder="Enter the Url"/>
                        </Form.Item>
                        <Form.Item label="Avatar" name="avatar">
                            <Upload
                                accept="image/*"
                                showUploadList={false}
                                beforeUpload={() => false}
                                fileList={avatarFile ? [avatarFile] : []}
                                onChange={handleAvatarChange}
                                name={'avatar'}
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
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </App>
    );
};

export default AllCategoryPage;