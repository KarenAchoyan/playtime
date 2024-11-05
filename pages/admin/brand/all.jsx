import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Input, message, Modal, Popconfirm, Space, Table, Upload } from 'antd';
import { DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import App from "../layouts/app";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getBrands, updateBrand } from "../../../store/brand/actions"; // Update the import based on your structure

const AllBrandPage = () => {
    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brand.brands); // Adjust according to your state structure

    const [editingBrand, setEditingBrand] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        dispatch(getBrands.request());
    }, [dispatch]);

    const handleDeleteBrand = (id) => {
        dispatch(deleteBrand.request(id));
        message.success('Brand deleted successfully');
    };

    function handleEditBrand(id) {
        const brand = brands.find((brand) => brand.id === id);
        setEditingBrand(brand);
        setImagePreview(process.env.IMAGE_URL2 + brand.avatar);
        form.setFieldsValue({
            name: brand.name,
            name_ru: brand.name_ru,
        });
        setEditModalVisible(true);
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => (
                <div>
                    <Image preview={false} src={process.env.IMAGE_URL2 + avatar} style={{ width: '150px' }} alt="" />
                </div>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Name (RU)',
            dataIndex: 'name_ru',
            key: 'name_ru',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <Space size="small">
                    <Popconfirm
                        title="Are you sure you want to delete this brand?"
                        onConfirm={() => handleDeleteBrand(id)}
                        okText="Yes"
                        cancelText="No"
                        key={`delete_${id}`}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />} key={`confirm_${id}`}>
                            Delete
                        </Button>
                    </Popconfirm>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEditBrand(id)}
                        key={`edit_${id}`}
                    >
                        Edit
                    </Button>
                </Space>
            ),
        }
    ];

    function handleBrandSubmit(values) {
        const formData = new FormData();
        formData.append('avatar', imageFile);
        formData.append('name', values.name);
        formData.append('name_ru', values.name_ru);
        formData.append('id', editingBrand.id);

        dispatch(updateBrand.request({ id: editingBrand.id, formData }));
        message.success('Brand successfully updated!');
        setEditModalVisible(false);
        form.resetFields();
        setImageFile(null);
        setImagePreview(null);
    }

    const handleImageChange = async (info) => {
        const file = info.fileList[0]?.originFileObj;
        if (file instanceof Blob) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <App>
            <h1>All Brands</h1>
            <div style={{ margin: '24px' }}>
                <Table dataSource={brands} columns={columns} rowKey="id" />
                <Modal
                    title="Edit Brand"
                    visible={editModalVisible}
                    onCancel={() => setEditModalVisible(false)}
                    footer={null}
                >
                    <Form form={form} onFinish={handleBrandSubmit}>
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
                        <Form.Item label="Image">
                            <Upload
                                accept="image/*"
                                showUploadList={false}
                                beforeUpload={() => false}
                                onChange={handleImageChange}
                            >
                                {imagePreview ? (
                                    <Image
                                        src={imagePreview}
                                        alt="Brand Image"
                                        preview={false}
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
                </Modal>
            </div>
        </App>
    );
};

export default AllBrandPage;
