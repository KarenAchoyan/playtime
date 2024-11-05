import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, message, Modal, Form, Input, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {deleteCategory, getCategories, updateCategory} from "../../../store/category/actions";
import {deleteContact, getAllContacts} from "../../../store/about/actions";

const All = () => {
    const dispatch = useDispatch();
    const users = useSelector((state)=>state.contact.contacts);

    useEffect(() => {
        dispatch(getAllContacts.request());
    }, [dispatch]);

    const handleDeleteCategory = (id) => {
        dispatch(deleteContact.request({id}));
        message.success('Row deleted ');
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: 'phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'message',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <Space size="smAll">
                    <Popconfirm
                        title="Are you sure you want to delete this category?"
                        onConfirm={() => handleDeleteCategory(id)}
                        okText="Yes"
                        cancelText="No"
                        key={`delete_${id}`}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />} key={`confirm_${id}`}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <App>
            <h1>All Users</h1>
            <div style={{margin: '24px'}}>
                <Table dataSource={users} columns={columns} rowKey="id"/>

            </div>
        </App>
    );
};

export default All;