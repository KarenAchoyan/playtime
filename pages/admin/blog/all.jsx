import React, {useEffect, useState} from 'react';
import {Button, Table, Modal, Form, Input, Upload, Image, message, notification} from 'antd';
import {EditOutlined, DeleteOutlined, UploadOutlined} from '@ant-design/icons';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {deleteBlog, getBlogs, searchBlogs, updateBlog} from "../../../store/blog/actions";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import {t} from "../../../utils/utils";
import {searchProducts} from "../../../store/products/actions";

const ReactQuill = dynamic(import('react-quill'), {ssr: false})

const AllBlogPage = () => {
    const blogs = useSelector((state) => state.blog.blogs);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [fileList, setFileList] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isDefault, setIsDefault] = useState(false);
    const filteredSearch = useSelector((state) => state?.blog?.searchResult?.data);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const dispatch = useDispatch();


    useEffect(() => {
        if (searchTerm !== '') {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            const timeoutId = setTimeout(() => {
                setIsDefault(false)
                dispatch(searchBlogs.request({query: searchTerm}));
            }, 500);
            setSearchTimeout(timeoutId);
        }else{
            setIsDefault(true)
        }
    }, [dispatch, searchTerm]);

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getBlogs.request());
    }, [dispatch]);

    const handleDeleteBlog = () => {
        dispatch(deleteBlog.request(selectedBlog.id));
        setDeleteModalVisible(false);
    };

    const handleEditBlog = (blog) => {
        const dataImages = blog.images;
        const data = dataImages.map((item, index) => {
            console.log(item.image[0]==='u')
            if(item.image[0]==='u'){
                item.url = process.env.IMAGE_URL2  + item.image
            }else{
                item.url = process.env.IMAGE_URL + item.image
            }
            item.name = "Image"
            item.uid = item.id
            return item;
        })
        setFileList(data)

        form.setFieldsValue({
            title: blog?.title,
            title_en: blog?.title_en,
            title_ru: blog?.title_ru,
            content: blog?.content,
            content_ru: blog?.content_ru,
            content_en: blog?.content_en,
        })
        setSelectedBlog(blog);
        setEditModalVisible(true);
    };

    const handleEditFormSubmit = (values) => {
        const updatedBlog = {...selectedBlog, title: values.title};

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('title_en', values.title_en);
        formData.append('title_ru', values.title_ru);
        formData.append('content', values.content);

        formData.append('content_en', values.content_en);

        formData.append('content_ru', values.content_ru);
        if (fileList.length > 0) {
            fileList.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });
        }
        formData.append('id', selectedBlog.id)

        dispatch(updateBlog.request({formData, id: selectedBlog.id}));

        setEditModalVisible(false);
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Qr Code',
            dataIndex: 'qrs.image',
            key: 'avatar',
            render: (_, blog) => (
                <Image preview={false} src={`https://poels.dahk.am/storage/${blog?.qrs?.image}`}
                       style={{width: '150px'}} alt=""/>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, blog) => (
                <div>
                    <Button
                        type="primary"
                        icon={<EditOutlined/>}
                        onClick={() => handleEditBlog(blog)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="danger"
                        icon={<DeleteOutlined/>}
                        onClick={() => {
                            setSelectedBlog(blog);
                            setDeleteModalVisible(true);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const beforeUpload = (file) => {
        // Example: Prevent upload if file size is greater than 2MB
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must be smaller than 2MB!');
        }
        return isLt2M;
    };

    const handleImagesChange = (info) => {
        const fileLists = [...info.fileList];
        setFileList(fileLists.map(file => file.originFileObj));
    };


    function UploadImages() {
        return (
            <Form.Item label="Images" name="images"
                       valuePropName="fileList"
                       getValueFromEvent={normFile}
            >
                <Upload
                    accept="image/*"
                    multiple
                    defaultFileList={fileList}
                    onChange={handleImagesChange}
                    beforeUpload={beforeUpload}
                    listType="picture"
                    onRemove={handleRemove}
                >
                    <Button icon={<UploadOutlined/>}>Upload Images</Button>
                </Upload>

            </Form.Item>
        )
    }
    function fetchDelete(id) {
        fetch(process.env.API_URL +'/blogs/deleteImage/' + id)
            .then(() => {
                notification['success']({
                    description: "Նկարը հաջողությամբ ջնջվել է",
                    duration: 7
                })
            }).catch(() => {
            notification['error']({
                description: "Նկարը չի գտնվել",
                duration: 7
            })
        })
    }

    const handleRemove = (file) => {
        fetchDelete(file.uid)
        return true;
    };

    const handleSearchChange = (e) => {
        if (e.target.value.length > 0) {
            setSearchTerm(e.target.value);
        }
    };

    return (
        <App>
            <Form.Item
                name="search"
                rules={[
                    {
                        required: true,
                        message: 'Please enter a search term!',
                        min: 3,
                    },
                ]}
                validateTrigger="onChange" // Trigger validation on each change
            >
                <Input
                    onChange={handleSearchChange}
                    placeholder={t("search")}
                />
            </Form.Item>
            <Table columns={columns} dataSource={!isDefault ? filteredSearch : blogs} rowKey="id"/>

            <Modal
                title="Delete Blog"
                visible={isDeleteModalVisible}
                onOk={handleDeleteBlog}
                onCancel={() => setDeleteModalVisible(false)}
            >
                <p>Are you sure you want to delete this blog?</p>
            </Modal>

            <Modal
                title="Edit Blog"
                visible={isEditModalVisible}
                onOk={() => setEditModalVisible(false)}
                onCancel={() => setEditModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setEditModalVisible(false)}>
                        Cancel
                    </Button>
                ]}
            >
                <Form
                    form={form}
                    name="edit-blog-form"
                    onFinish={handleEditFormSubmit}
                    initialValues={{
                        title: selectedBlog?.title || '',
                        title_en: selectedBlog?.title_en || '',
                        title_ru: selectedBlog?.title_ru || '',
                        content: selectedBlog?.content || '',
                        content_ru: selectedBlog?.content_ru || '',
                        content_en: selectedBlog?.content_en || '',
                    }}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{required: true, message: 'Please enter the title'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="title_en"
                        label="Title English"
                        rules={[{required: true, message: 'Please enter the title'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="title_ru"
                        label="Title Russian"
                        rules={[{required: true, message: 'Please enter the title'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <UploadImages/>
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
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </App>
    );
};

export default AllBlogPage;