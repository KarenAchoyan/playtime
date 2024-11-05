import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, message, Modal, Form, Input, Button, Space, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import App from "../layouts/app";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategories, updateCategory } from "../../../store/category/actions";

const { Option } = Select;

const AllCategoryPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category?.categories);

    const [editingCategory, setEditingCategory] = useState(null);
    const [editForm] = Form.useForm();
    const [editModalVisible, setEditModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getCategories.request());
    }, [dispatch]);

    const handleDeleteCategory = (categoryId) => {
        dispatch(deleteCategory.request(categoryId));
        message.success('Category deleted successfully');
    };

    const handleEditCategory = (categoryId) => {
        const category = categories.find((category) => category.id === categoryId);
        if (category) {
            setEditingCategory(category);
            editForm.setFieldsValue({
                name: category.name,
                name_en: category.name_en,
                name_ru: category.name_ru,
            });
            setEditModalVisible(true);
        } else {
            categories.forEach((parentCategory) => {
                if (parentCategory.children) {
                    const subcategory = parentCategory.children.find(sub => sub.id === categoryId);
                    if (subcategory) {
                        setEditingCategory(subcategory);
                        editForm.setFieldsValue({
                            name: subcategory.name,
                            name_en: subcategory.name_en,
                            name_ru: subcategory.name_ru,
                        });
                        setEditModalVisible(true);
                    }
                }
            });
        }
    };

    const handleUpdateCategory = (values) => {
        dispatch(updateCategory.request({ ...editingCategory, ...values }));
        setEditModalVisible(false);
        setEditingCategory(null);
        message.success('Category updated successfully');
    };

    const expandedRowRender = (record) => {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Name English',
                dataIndex: 'name_en',
                key: 'name_en',
            },
            {
                title: 'Name Russian',
                dataIndex: 'name_ru',
                key: 'name_ru',
            },
            {
                title: 'Action',
                dataIndex: 'id',
                key: 'action',
                render: (categoryId) => (
                    <Space size="small">
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => handleEditCategory(categoryId)}
                            key={`edit_${categoryId}`}
                        >
                            Edit
                        </Button>
                        <Popconfirm
                            title="Are you sure you want to delete this category?"
                            onConfirm={() => handleDeleteCategory(categoryId)}
                            okText="Yes"
                            cancelText="No"
                            key={`delete_${categoryId}`}
                        >
                            <Button type="primary" danger icon={<DeleteOutlined />} key={`confirm_${categoryId}`}>
                                Delete
                            </Button>
                        </Popconfirm>
                    </Space>
                ),
            },
        ];

        return <Table columns={columns} dataSource={record.children} pagination={false} rowKey="id" />;
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Name English',
            dataIndex: 'name_en',
            key: 'name_en',
        },
        {
            title: 'Name Russian',
            dataIndex: 'name_ru',
            key: 'name_ru',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (categoryId) => (
                <Space size="small">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEditCategory(categoryId)}
                        key={`edit_${categoryId}`}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this category?"
                        onConfirm={() => handleDeleteCategory(categoryId)}
                        okText="Yes"
                        cancelText="No"
                        key={`delete_${categoryId}`}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />} key={`confirm_${categoryId}`}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <App>
            <h1>All Categories</h1>
            <div style={{ margin: '24px' }}>
                <Table
                    dataSource={categories}
                    columns={columns}
                    rowKey="id"
                    expandable={{ expandedRowRender }}
                />
                <Modal
                    title="Edit Category"
                    visible={editModalVisible}
                    onCancel={() => setEditModalVisible(false)}
                    footer={null}
                >
                    <Form form={editForm} layout="vertical" onFinish={handleUpdateCategory}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter the name' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="name_en"
                            label="Name English"
                            rules={[{ required: true, message: 'Please enter the name' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="name_ru"
                            label="Name Russian"
                            rules={[{ required: true, message: 'Please enter the name' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </App>
    );
};

export default AllCategoryPage;
