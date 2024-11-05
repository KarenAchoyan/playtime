import React, {useEffect, useState} from 'react';
import {
    Table,
    Popconfirm,
    message,
    Modal,
    Form,
    Input,
    Button,
    Space,
    Select,
    Image,
    Skeleton,
    TreeSelect, Upload,
} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import App from '../layouts/app';
import {useDispatch, useSelector} from 'react-redux';
import {updateProduct, deleteProduct, getProducts, hasProduct, searchProducts} from '../../../store/products/actions';
import {getCategories, getSubCategories} from '../../../store/category/actions';
import {getBlogs} from '../../../store/blog/actions';
import {t} from "../../../utils/utils";
import UploadAvatar from "./UploadAvatar";
import UploadImages from "./UploadImages";

const {Option} = Select;
const {SHOW_PARENT} = TreeSelect;

const AllCategoryPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product?.products);
    const isUpdate = useSelector((state) => state.product?.isUpdating);
    const [editForm] = Form.useForm();
    const isProductsLoading = useSelector((state) => state.product?.isLoading);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const categories = useSelector((state) => state.category?.categories);
    const blogs = useSelector((state) => state.blog?.blogs);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [allCategories, setAllCategories] = useState([]);
    const [imagesForPrint, setImagesForPrint] = useState([])
    const [files, setFiles] = useState([])

    const [searchTerm, setSearchTerm] = useState('');
    const [isDefault, setIsDefault] = useState(false);
    const filteredSearch = useSelector((state) => state?.product?.searchResult?.data);
    const [searchTimeout, setSearchTimeout] = useState(null);


    useEffect(() => {
        if (searchTerm !== '') {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            const timeoutId = setTimeout(() => {
                setIsDefault(false)
                dispatch(searchProducts.request({query: searchTerm}));
            }, 500);
            setSearchTimeout(timeoutId);
        } else {
            setIsDefault(true)
        }
    }, [dispatch, searchTerm]);


    useEffect(() => {
        dispatch(getProducts.request());
        dispatch(getCategories.request());
        dispatch(getBlogs.request());
    }, [dispatch]);


    useEffect(() => {
        const newData = categories.map((item) => {
            item.value = item.id;
            item.title = item.name;
            item.children = item.children.map((child) => {
                child.value = child.id;
                child.title = child.name;
                return child;
            });
            return item;
        });
        setAllCategories(newData);
    }, [categories]);

   function setFilesImages(images){
       console.log('okkkk', images)
       setFiles(images)
   }
    const handleDeleteCategory = (id) => {
        dispatch(deleteProduct.request(id));
        message.success('Product deleted successfully');
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


    async function handleEditProduct(id) {
        const product = products.find((pr) => pr.id === id);
        if (product) {
            const dataImages = product?.images;
            const data = dataImages.map((item, index) => {
                item.url = process.env.IMAGE_URL + item.image
                item.name = "Image"
                item.uid = item.id
                return item;
            })
            setImagesForPrint(data);
            const newData = product?.categories?.map((item) => item.category);
            const selectedCats = newData.map(item => item.id);
            setEditingProduct(product);
            const categoryIds = JSON.parse(product.category_id);
            dispatch(getSubCategories.request({id: categoryIds[0]}));
            editForm.setFieldsValue({
                title: product.title,
                title_ru: product.title_ru,
                description: product.description,
                description_ru: product.description_ru,
                price: product.price,
                important: product.important,
                blog_id: product.blog_id,
                category_id: selectedCats,
            });
            setAvatarPreview(process.env.IMAGE_URL2  + product.avatar);
            setEditModalVisible(true);
        }
    }

    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('title_ru', values.title_ru);
        formData.append('model', values.model);
        formData.append('important', values.important);
        formData.append('category_id', JSON.stringify(values.category_id));
        formData.append('price', parseInt(values.price));
        if (files.length > 0) {
            files.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });
        }
        if (avatarFile !== null) {
            formData.append('avatar', values.avatar.file);
        }
        dispatch(updateProduct.request({formData, id: editingProduct.id}));
        message.success('Category updated successfully');
        setAvatarFile(null)
        setEditModalVisible(false);
        setEditingProduct(null);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => (
                <div>
                    <Skeleton loading={isUpdate} active>
                        <Image preview={false} src={process.env.IMAGE_URL2  + avatar} style={{width: '150px'}}
                               alt=""/>
                    </Skeleton>
                </div>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <Space size="small">
                    <Button
                        type="primary"
                        icon={<EditOutlined/>}
                        onClick={() => handleEditProduct(id)}
                        key={`edit_${id}`}
                    >
                        Edit
                    </Button>
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
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id, status) => (
                <Space size="small">
                    <Popconfirm
                        title="Are you sure you want to change status of this product?"
                        onConfirm={() => handleHasProduct(id, status)}
                        okText="Yes"
                        cancelText="No"
                        key={`on_${id}`}
                    >
                        <Button type="primary" key={`confirm_${id}`}>
                            {status?.status === 1 ? "Off" : "On"}
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    const handleSearchChange = (e) => {
        if (e.target.value.length > 0) {
            setSearchTerm(e.target.value);
        }
    };
    function handleHasProduct(id, status) {
        dispatch(hasProduct.request(status));
    }
    return (
        <App>
            <h1>All Products</h1>
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
            <div style={{margin: '24px'}}>
                <Skeleton loading={isProductsLoading} active>
                    <Table dataSource={!isDefault ? filteredSearch : products} columns={columns} rowKey="id"/>
                </Skeleton>
                <Modal
                    title="Edit Product"
                    visible={editModalVisible}
                    onCancel={() => setEditModalVisible(false)}
                    footer={null}
                >
                    <Form form={editForm} layout="vertical" onFinish={handleSubmit}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{required: true, message: 'Please enter the name'}]}
                        >
                            <Input placeholder="Enter the Title"/>
                        </Form.Item>
                        <Form.Item
                            label="Title Russian"
                            name="title_ru"
                            rules={[{required: true, message: 'Please enter the name'}]}
                        >
                            <Input placeholder="Enter the Title"/>
                        </Form.Item>
                        <Form.Item
                            label="New or Best"
                            name="important"
                            rules={[{required: true, message: 'Please enter the type of product'}]}
                        >
                            <Select defaultValue="Select type">
                                <Option value={0}>Norm Product</Option>
                                <Option value={2}>New</Option>
                                <Option value={1}>Best</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Category"
                            name="category_id"
                            rules={[{required: true, message: 'Please select a category'}]}
                        >
                            <TreeSelect
                                treeData={allCategories}
                                treeCheckable={true}
                                showCheckedStrategy={SHOW_PARENT}
                                placeholder="Please select"
                                style={{width: '100%'}}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{required: true, message: 'Please enter the price'}]}
                        >
                            <Input type="number" min={0} placeholder="Enter the price"/>
                        </Form.Item>
                        <UploadAvatar avatarFile={avatarFile} avatarPreview={avatarPreview}
                                      handleAvatarChange={handleAvatarChange}/>


                        <UploadImages images={imagesForPrint} setFiles={setFilesImages}/>
                        <Form.Item>
                            <Button loading={isUpdate} type="primary" htmlType="submit" disabled={isUpdate}>
                                {isUpdate ? 'Updating...' : 'Submit'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </App>
    );
};

export default AllCategoryPage;
