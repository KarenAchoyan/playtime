import React, {useEffect, useState} from 'react';
import styles from '../../styles/basket.module.css';
import {Button, Form, Input, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {paymentSignIn} from "../../store/payment/actions";
import {t, validateArmenianOrRussianPhoneNumber} from "../../utils/utils";

const Step3 = ({prevStep,inputValues, setValues, submitForm}) => {
    const [currentStep, setCurrentStep] = useState(3);
    const [isRequest, setIsRequest] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            phone: inputValues.phone,
            address: inputValues.address,
            payment_type:inputValues.paymentType===1 ? "Բանկային քարտ" : inputValues.paymentType === 2 ? "Idram" : "Paypal"
        })
    }, [form, inputValues.address, inputValues.paymentType, inputValues.phone]);

    const handleSubmit = (values) => {
        setValues((prev)=>{
            return {
                ...prev,
                values
            }
        });
        setIsRequest(true)
        submitForm()
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
            <div className={styles.formStepLast}>
                <Form form={form} onFinish={handleSubmit}>
                    <div className={styles.lastPage}>
                        <div className={styles.regInputs}>
                            <div>
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
                                    <Input disabled placeholder={'+37477123456'}/>
                                </Form.Item>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className={styles.regInputs}>
                            <div>
                                <label htmlFor="">{t('address')}*</label>
                                <Form.Item
                                    name="address"
                                    rules={[
                                        {required: true, message: t("contact_field_error_address")}
                                    ]}
                                >
                                    <Input disabled />
                                </Form.Item>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className={styles.regInputs}>
                            <div>
                                <label htmlFor="">{t('payment_option')}</label>
                                <Form.Item
                                    name="payment_type"
                                    rules={[
                                        {required: true, message: t("contact_field_error_payment_type")},
                                    ]}
                                >
                                    <Input disabled />
                                </Form.Item>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className={styles.buttonsForm}>
                            <Button onClick={prevStep} type="primary" htmlType="button">
                                {t('back')}
                            </Button>
                            <Button loading={isRequest} type="primary" htmlType="submit" disabled={isRequest}>
                                {isRequest ? 'Updating...' :  t("append")}
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Step3;
