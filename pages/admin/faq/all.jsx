import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import App from '../layouts/app';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFaq, getFaqs, updateFaq } from '../../../store/faq/actions';

const AllFaqs = () => {
    const faqs = useSelector((state) => state.faq.faqs);
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm(); // Define the form variable

    useEffect(() => {
        dispatch(getFaqs.request());
    }, [dispatch]);

    const handleDeleteFAQ = () => {
        dispatch(deleteFaq.request({id:selectedFaq.id}));
        setDeleteModalVisible(false);
    };

    const handleEditFAQ = (faq) => {
        setSelectedFaq(faq);
        setEditModalVisible(true);
    };

    const handleEditFormSubmit = (values) => {
        values.id = selectedFaq.id

        dispatch(updateFaq.request( values ));

        setEditModalVisible(false);
    };

    const columns = [
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
        },
        {
            title: 'Question English',
            dataIndex: 'question_en',
            key: 'question_en',
        },
        {
            title: 'Question Russian',
            dataIndex: 'question_ru',
            key: 'question_ru',
        },
        {
            title: 'Answer English',
            dataIndex: 'answer_en',
            key: 'answer_en',
        },
        {
            title: 'Answer Russian',
            dataIndex: 'answer_ru',
            key: 'answer_ru',
        },
        {
            title: 'Answer',
            dataIndex: 'answer',
            key: 'answer',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, faq) => (
                <div>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEditFAQ(faq)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            setSelectedFaq(faq);
                            setDeleteModalVisible(true);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <App>
            <Table columns={columns} dataSource={faqs} rowKey="id" />

            <Modal
                title="Delete FAQ"
                visible={isDeleteModalVisible}
                onOk={handleDeleteFAQ}
                onCancel={() => setDeleteModalVisible(false)}
            >
                <p>Are you sure you want to delete this FAQ?</p>
            </Modal>

            {/* Edit FAQ Modal */}
            <Modal
                title="Edit FAQ"
                visible={isEditModalVisible}
                onOk={() => setEditModalVisible(false)}
                onCancel={() => setEditModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setEditModalVisible(false)}>
                        Cancel
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    name="edit-faq-form"
                    onFinish={handleEditFormSubmit}
                    initialValues={{
                        question: selectedFaq?.question || '',
                        question_en: selectedFaq?.question_en || '',
                        question_ru: selectedFaq?.question_ru || '',
                        answer_en: selectedFaq?.answer_en || '',
                        answer_ru: selectedFaq?.answer_ru || '',
                        answer: selectedFaq?.answer || '',
                    }}
                >
                    <Form.Item
                        name="question"
                        label="Question"
                        rules={[{ required: true, message: 'Please enter the question' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="question_en"
                        label="Question English"
                        rules={[{ required: true, message: 'Please enter the question in English' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="question_ru"
                        label="Question Russian"
                        rules={[{ required: true, message: 'Please enter the question in Russian' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="answer_en"
                        label="Answer English"
                        rules={[{ required: true, message: 'Please enter the answer in English' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="answer_ru"
                        label="Answer Russian"
                        rules={[{ required: true, message: 'Please enter the answer in Russian' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="answer"
                        label="Answer"
                        rules={[{ required: true, message: 'Please enter the answer' }]}
                    >
                        <Input.TextArea />
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

export default AllFaqs;
