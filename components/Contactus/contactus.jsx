import React, {useEffect, useState} from 'react';
import styles from "../../styles/contactus.module.css"
import Info from "./info";
import {PhoneFilled} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {getContact, insertContact} from "../../store/about/actions";
import {Button, Form, Image, Input, message} from 'antd';
import {t, validateArmenianOrRussianPhoneNumber} from "../../utils/utils";
import {useRouter} from "next/router";

const {TextArea} = Input;
const Contactus = () => {
    const dispatch = useDispatch();
    const contact = useSelector((state) => state.contact.contact);
    const [addresses, setAddresses] = useState([])
    const [form] = Form.useForm();
    const [isSuccess, setIsSuccess] = useState(false)

    const router = useRouter();

    const {locale} = router;

    useEffect(()=>{
        form.resetFields();
    },[locale])


    useEffect(() => {
        dispatch(getContact.request());
    }, [dispatch]);

    const handleSubmit = (values) => {
        form.resetFields()
        dispatch(insertContact.request(values))
        setIsSuccess(true)
        message.success("Ձեր հայտը ուղարկված է")
    };

    useEffect(() => {
        const t = contact?.addresses || "[]"
        const address = JSON.parse(t);
        const newArr = address.map((item) => {
            return item.address;
        })
        setAddresses(newArr)
    }, [contact])




    return (
        <div>
            <div className={styles.page}>
                <div className={styles.contact}>
                    <div className={styles.contactPage}>
                        <div className={styles.title}>
                            <h1>{t('feedback')}</h1>
                        </div>
                        <div className={styles.location}>

                            <Info info={
                                {
                                    key:"phone",
                                    title: t('phone'),
                                    info: [
                                        contact?.phone,
                                    ],
                                    icon: ""
                                }
                            }>
                                <Image preview={false} src="/phone.png" alt=""/>
                            </Info>
                            <Info info={
                                {
                                    key:"email",
                                    title: t('email'),
                                    info: [
                                        contact?.email,
                                    ],
                                    icon: ""
                                }
                            }>
                                <Image preview={false} src="/mail.png" alt=""/>
                            </Info>
                        </div>
                    </div>
                </div>
                <div className={styles.registration}>
                    <div className={styles.regTitle}>
                        <h2>{t('send_message')}</h2>
                    </div>
                    <div className={styles.background}>
                        <Form form={form} onFinish={handleSubmit}>
                            <div className={styles.regPage}>
                                <div className={styles.regInputs}>
                                    <label htmlFor="">{t('contact_name')}</label>
                                    <Form.Item
                                        name="name"
                                        rules={[{required: true, message: t("contact_field_error_name")}]}
                                    >
                                        <Input placeholder={t('contact_name')} />
                                    </Form.Item>
                                </div>
                                <div className={styles.regInputs}>
                                    <label htmlFor="">{t('contact_surname')}</label>
                                    <Form.Item
                                        name="surname"
                                        rules={[{required: true, message:t("contact_field_error_surname")}]}
                                    >
                                        <Input placeholder={t('surname')+"*"} />
                                    </Form.Item>
                                </div>
                                <div className={styles.regInputs}>
                                    <label htmlFor="">{t('email')}*</label>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {required: true, message: t("contact_field_error_email")},
                                            {type: 'email', message: t("contact_field_error_email_2")},
                                        ]}
                                    >
                                        <Input placeholder={t('email')+"*"} />
                                    </Form.Item>
                                </div>
                                <div className={styles.regInputs}>
                                    <label htmlFor="">{t('phone')}*</label>
                                    <Form.Item
                                        name="phone"
                                        rules={[
                                            {required: true, message:t("contact_field_error_phone_1")},
                                            {
                                                validator: validateArmenianOrRussianPhoneNumber,
                                                message: t("contact_field_error_phone_2")
                                            },
                                        ]}
                                    >
                                        <Input placeholder={t('+37477123456')} />
                                    </Form.Item>
                                </div>
                                <div className={styles.regInputs}>
                                    <label htmlFor="">{t('contact_message')}</label>
                                    <Form.Item
                                        name="message"
                                        rules={[
                                            {required: true, message: t("contact_field_error_message")},
                                            {min: 10, message: t("contact_field_error_message_2")},
                                            {max: 200, message: t("contact_field_error_message_3")},
                                        ]}
                                    >
                                        <Input.TextArea autoSize={{minRows: 2, maxRows: 6}} placeholder={t('contact_message')} />
                                    </Form.Item>
                                    {isSuccess ?
                                        <div className={styles.greenSuccess}>
                                            <p>Ձեր նամակը հաջողությամբ ուղարկվել է</p>
                                        </div>
                                        : null}
                                    <div>
                                        <Button type="primary" htmlType="submit">
                                            {t('contact_send')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contactus;