import React, {useState, useEffect} from 'react';
import {Form, Input, Button, message} from 'antd';
import App from "../layouts/app";
import {getContact, updateContact} from "../../../store/about/actions";
import {useDispatch, useSelector} from "react-redux";
import {PlusOutlined} from "@ant-design/icons";

const UpdateContactInfoPage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const contact = useSelector((state) => state.contact.contact);

    useEffect(() => {
        dispatch(getContact.request());
    }, [dispatch, form]);

    const handleSubmit = async (values) => {
        values.addresses = JSON.stringify(values.addresses);
        values.id = contact.id;
        dispatch(updateContact.request({...contact, ...values}));
        message.success('Contact information updated successfully!');
    };

    useEffect(() => {
        if (contact) {
            // contact.addresses =  JSON.parse(contact?.addresses || "{}");
            const data = contact.addresses || "[]";
            const info = JSON.parse(data);

            form.setFieldsValue({
                email: contact.email,
                addresses: info || [],
                phone: contact.phone,
            });
        }
    }, [contact,form]);

    return (
        <App>
            <div>
                <h1>Update Contact Information</h1>
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {type: 'email', message: 'Please enter a valid email'},
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.List name="addresses">
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({key, name, fieldKey, ...restField}) => (
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'address']}
                                        fieldKey={[fieldKey, 'address']}
                                        label={`Address ${key + 1}`}
                                        key={key}
                                    >
                                        <Input/>
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined/>}>
                                        Add Address
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </App>
    );
};

export default UpdateContactInfoPage;