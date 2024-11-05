import React, {useEffect} from 'react';
import {Card, Form, Input, Button, message, Select} from 'antd';
import App from "../layouts/app";
import {addCategory, getCategories} from "store/category/actions";
import {useDispatch, useSelector} from "react-redux";

const {Option} = Select;

const CreateCategoryPage = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const categories = useSelector((state) => state.category?.categories);

    useEffect(() => {
        dispatch(getCategories.request());
    }, [dispatch]);

    const handleSubmit = (values) => {
        dispatch(addCategory.request(values));
        message.success('Category created successfully');
        form.resetFields();
    };

    return (
        <App>
            <Card title="Create Category">
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter the name'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="name_ru"
                        label="Name Russian"
                        rules={[{required: true, message: 'Please enter the name'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="parent_id"
                        label="Category"
                        rules={[{required: false, message: 'Please select a category'}]}
                    >
                        <Select placeholder="Select a category" name={'category_id'}>
                            {categories?.length > 0 ?
                                    categories.map(category => (
                                        <Option key={category.id} value={category.id}>
                                            {category.name}
                                        </Option>
                                    ))
                                :
                                null
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </App>
    );
};

export default CreateCategoryPage;