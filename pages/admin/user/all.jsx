import React, {useEffect, useState} from 'react';
import {Table, Popconfirm, message, Modal, Form, Input, Button, Space, Upload} from 'antd';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, users} from "../../../store/user/actions";
import {DeleteOutlined} from "@ant-design/icons";

const AllCategoryPage = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.user.users);

    useEffect(() => {
        dispatch(users.request());
    }, [dispatch]);

    const handleDeleteCategory = (id) => {
        dispatch(deleteUser.request(id));
        message.success('User deleted successfully');
    };


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Role',
            dataIndex: 'role_id',
            key: 'role_id',
            render: (role_id) => (
                <p>{role_id===1 ? "Admin" : role_id===2 ? "Seller" : "Added"}</p>
            )
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
                </Space>
            ),
        },
    ];


    return (
        <App>
            <h1>All Users</h1>
            <div style={{margin: '24px'}}>
                <Table dataSource={allUsers} columns={columns} rowKey="id"/>
            </div>
        </App>
    );
};

export default AllCategoryPage;