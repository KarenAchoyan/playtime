import React, {useContext, useState} from 'react';
import styles from '../../styles/basket.module.css';
import {Button, Form, Input, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {paymentSignIn} from "../../store/payment/actions";
import {t, validateArmenianOrRussianPhoneNumber} from "../../utils/utils";
import RateContext from "../../providers/rateContext";

const Step2 = ({total,prevStep,next,setValues,region}) => {
    const [currentStep, setCurrentStep] = useState(2);
    const [activeId, setActiveId] = useState(1)
    const {price, currentRate} = useContext(RateContext)

    function checkSelect(){
        setValues((prev)=>{
            return {
                ...prev,
                paymentType:activeId
            }
        });

        next(3)
    }
    function clickItem(id){
        setActiveId(id)

    }
    return (
        <div>
            <div className={styles.row}>
                <div
                    className={`${styles.circleNumber} ${currentStep >= 1 ? styles.active : ''}`}
                >
                    <span className={styles.radius}>1</span>
                </div>
                <div className={styles.line}/>
                <div
                    className={`${styles.circleNumber} ${currentStep >= 2 ? styles.active : ''}`}
                >
                    <span className={styles.radius}>2</span>
                </div>
                <div className={styles.line}/>
                <div
                    className={`${styles.circleNumber} ${currentStep >= 3 ? styles.active : ''}`}
                >
                    <span className={styles.radius}>3</span>
                </div>
            </div>
            <div className={styles.formStep}>
                <div onClick={()=>clickItem(1)} className={styles.paymentTypes} style={{borderColor: activeId === 1 ? "orange" : "black"}}>
                    <div className={styles.icon}>
                        <img src="/cart.png" alt=""/>
                    </div>
                    <div className={styles.text}>
                        <h3>Բանկային քարտ</h3>
                    </div>
                </div>
                {/*<div onClick={()=>clickItem(2)} className={styles.paymentTypes} style={{borderColor: activeId === 2 ? "orange" : "black"}}>*/}
                {/*    <div className={styles.icon}>*/}
                {/*        <img src="/idram.png" alt=""/>*/}
                {/*    </div>*/}
                {/*    <div className={styles.text}>*/}
                {/*        <h3>Idram</h3>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div onClick={()=>clickItem(3)} className={styles.paymentTypes} style={{borderColor: activeId === 3 ? "orange" : "black"}}>
                    <div className={styles.icon}>
                        <img src="/paypal.png" alt=""/>
                    </div>
                    <div className={styles.text}>
                        <h3>Paypal</h3>
                    </div>
                </div>
                <div>
                    <div className={styles.shoppingLast}>
                        <div className={styles.shoppingResult}>
                            <ul>
                                <li>
                                    <span>{t("pricesTotal")}:</span>
                                    <span> {price(total)} {currentRate?.current}</span>
                                </li>
                                <li>
                                    <span>{t("delivery")}:</span>
                                    <span>{price(region === "Russia" ? 8500 : region === 'USA' ? 20000 : 1500)}{currentRate?.current}</span>
                                </li>
                                <li>
                                    <span>{t("general")}: </span>
                                    <span> {parseFloat(Number(price(total)) + Number(price(region === "Russia" ? 8500 : region === 'USA' ? 20000 : 1500))).toFixed(1)} {currentRate?.current}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.buttonsForm}>
                    <Button onClick={prevStep} type="primary" htmlType="button">
                        {t('back')}
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={checkSelect}>
                        {t('next')}
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default Step2;
