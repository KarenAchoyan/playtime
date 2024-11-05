import React, {useEffect, useState} from 'react';
import styles from '../../styles/basket.module.css';
import {Button, Form, Input, message, notification, Select} from "antd";
import {regions, t, validateArmenianOrRussianPhoneNumber} from "../../utils/utils";
import {useRouter} from "next/router";

const Step1 = ({prevStep, setValues, next}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [form] = Form.useForm();
    const router = useRouter();

    const {locale} = router;


    useEffect(() => {
        form.resetFields();
    }, [form, locale])

    const handleSubmit = (values) => {
        setValues((prev) => {
            return {
                ...prev,
                ...values
            }
        });
        next(2)
    };



    return (
        <div>
            <div className={styles.row}>
                <div
                    className={`${styles.circleNumber} ${currentStep >= 1 ? styles.active : ''}`}
                >
                    <span className={styles.radius}>1</span>
                </div>
                <div className={styles.line}></div>
                <div
                    className={`${styles.circleNumber} ${currentStep >= 2 ? styles.active : ''}`}
                >
                    <span className={styles.radius}>2</span>
                </div>
                <div className={styles.line}></div>
                <div
                    className={`${styles.circleNumber} ${currentStep >= 3 ? styles.active : ''}`}
                >
                    <span className={styles.radius}>3</span>
                </div>
            </div>
            <div className={styles.formStep}>
                <Form form={form} onFinish={handleSubmit}>
                    <div className={styles.regPage}>
                        <div className={styles.regInputs}>
                            <label htmlFor="">{t('contact_name')}</label>
                            <Form.Item
                                name="name"
                                rules={[{required: true, message: t("contact_field_error_name")}]}
                            >
                                <Input placeholder={t('contact_name')}/>
                            </Form.Item>
                        </div>
                        <div className={styles.regInputs}>
                            <label htmlFor="">{t('contact_surname')}</label>
                            <Form.Item
                                name="surname"
                                rules={[{required: true, message: t("contact_field_error_surname")}]}
                            >
                                <Input placeholder={t('surname') + "*"}/>
                            </Form.Item>
                        </div>

                        <div className={styles.regInputs}>
                            <label htmlFor="">{t('contact_region')}*</label>
                            <Form.Item
                                name="region"
                                rules={[{required: true, message: t("contact_field_error_region")}]}
                            >
                                <Select
                                    placeholder={t('contact_region')}
                                    options={regions.map(region => ({
                                        ...region,
                                        label: locale === 'ru' ? region.label_ru : locale === 'en' ? region.label_en : region.label
                                    }))}
                                />
                            </Form.Item>
                        </div>
                        <div className={styles.regInputs}>
                            <label htmlFor="">{t('address')}*</label>
                            <Form.Item
                                name="address"
                                rules={[{required: true, message: t("contact_field_error_region")}]}
                            >
                                <Input placeholder={t('address')}/>
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
                                <Input placeholder={t('email') + "*"}/>
                            </Form.Item>
                        </div>
                        <div className={styles.regInputs}>
                            <label htmlFor="">{t('phone')}*</label>
                            <Form.Item
                                name="phone"
                                rules={[
                                    {required: true, message: t("contact_field_error_phone_1")},
                                    {
                                        validator: validateArmenianOrRussianPhoneNumber,
                                        message: t("contact_field_error_phone_2")
                                    },
                                ]}
                            >
                                <Input placeholder={'+37477123456'}/>
                            </Form.Item>
                        </div>

                        <div className={styles.textareaReg}>
                            <label htmlFor="">{t('contact_message')}</label>
                            <Form.Item
                                name="message"
                                rules={[
                                    {required: true, message: t("contact_field_error_message")},
                                    {min: 10, message: t("contact_field_error_message_2")},
                                    {max: 200, message: t("contact_field_error_message_3")},
                                ]}
                            >
                                <Input.TextArea autoSize={{minRows: 2, maxRows: 6}} placeholder={t('contact_message')}/>
                            </Form.Item>
                        </div>
                        <div className={styles.buttonsForm}>
                            <Button onClick={prevStep} type="primary" htmlType="button">
                                {t('back')}
                            </Button>
                            <Button type="primary" htmlType="submit">
                                {t('next')}
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Step1;
