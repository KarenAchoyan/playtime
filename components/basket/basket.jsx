import React, {useContext, useEffect, useRef, useState} from 'react';

import styles from "../../styles/basket.module.css"
import Item from "./item";
import Button from "../ui/button/button";
import CountContext from 'providers/countContext';
import BasketContext from 'providers/BasketContext';
import Products from "../Products/products";
import {useDispatch, useSelector} from "react-redux";
import {getProductsAll} from "../../store/products/actions";
import RateContext from "../../providers/rateContext";
import {t} from "../../utils/utils";
import Step1 from "./step_1";
import Step2 from "./step_2";
import Step3 from "./step_3";


const Basket = () => {
    const [basketItems, setBasketItems] = useState([]);
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();
    const {price, currentRate} = useContext(RateContext)
    const [step, setStep] = useState(0)
    const products = useSelector((state) => state.product.products) || [];

    const [page] = useState(1);
    const itemsPerPage = 3;
    const containerRef = useRef();

    const [values, setValues] = useState({});

    useEffect(() => {
        loadBasketItems();
    }, [page]);

    const {setCount} = useContext(CountContext);
    const {baskets, remove, removeFromFavorite} = useContext(BasketContext);
    const [isShow, setIsShow] = useState(false)


    useEffect(() => {
        dispatch(getProductsAll.request());
    }, [dispatch]);

    useEffect(() => {
        setBasketItems(baskets)
    }, [baskets])

    useEffect(() => {
        if (baskets.length > 3) {
            setIsShow(true);
        }
    }, [])

    useEffect(() => {
        const price = basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(price);
    }, [basketItems]);

    const loadBasketItems = () => {
        const newItems = JSON.parse(localStorage.getItem('basket')) || [];
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newPageItems = newItems.slice(startIndex, endIndex);
        setBasketItems((prevBasketItems) => [...prevBasketItems, ...newPageItems]);
    }

    const styleScrolling = {
        overflowY: isShow ? "scroll" : "auto",
        height: isShow ? "450px" : "auto"
    }

    const handleRemove = (itemToRemove) => {
        setCount((prev) => {
            return {
                ...prev,
                basket: --prev.basket
            }
        })
        remove(itemToRemove)
    };

    const updateBasketItemQuantity = (itemId, newQuantity) => {
        setBasketItems((prevBasketItems) => {
            const updatedBasket = [...prevBasketItems];
            const existingProductIndex = updatedBasket.findIndex((x) => x.id === itemId);

            if (existingProductIndex !== -1) {
                updatedBasket[existingProductIndex] = {
                    ...updatedBasket[existingProductIndex],
                    quantity: newQuantity,
                };
            }

            localStorage.setItem('basket', JSON.stringify(updatedBasket));
            return updatedBasket;
        });
    };

    function handlerBuy() {
        setStep(1)
    }

    const fetchPaymentStatus = async (data) => {
        values.products = data
        try {
            const response = await fetch('https://poels.dahk.am/api/payment/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            if (response.ok) {
                const data = await response.json();
                if (Number(values.paymentType) === 1) {
                    window.location.href = data.formUrl ? data.formUrl : "#"
                } else {
                    window.open(data.approval_url ? data.approval_url : "#");
                }
            } else {
                console.error('Failed to fetch payment status');
            }
        } catch (error) {
            console.error('Error fetching payment status:', error);
        }
    };

    const handleSubmit = () => {

        fetchPaymentStatus(localStorage.getItem('basket') || "[]")
    };
    return (
        <div>
            {step === 0 ?
                <div className={styles.basket} ref={containerRef}>
                    {basketItems.length > 0 ? (
                        <div className={styles.title}>
                            <h1>{t("basket")}</h1>
                        </div>
                    ) : null}
                    {basketItems.length > 0 ? (
                        <div>
                            <div>
                                <div style={styleScrolling}>
                                    {basketItems.map((item) => (
                                        <Item
                                            onRemove={handleRemove}
                                            removeFavorite={removeFromFavorite}
                                            updateBasketItemQuantity={updateBasketItemQuantity}
                                            key={item.id}
                                            item={item}
                                        />
                                    ))}
                                </div>
                                <div>
                                    <div className={styles.shoppingLast}>
                                        <div className={styles.shoppingResult}>
                                            <ul>
                                                <li>
                                                    <span>{t("pricesTotal")}:</span>
                                                    <span> {price(total)} {currentRate?.current}</span>
                                                </li>
                                                {/*<li>*/}
                                                {/*    <span>{t("delivery")}:</span>*/}
                                                {/*    <span>{price(2000)}{currentRate?.current}</span>*/}
                                                {/*</li>*/}
                                                <li>
                                                    <span>{t("general")}: </span>
                                                    <span> {price(total)} {currentRate?.current}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.shoppingStep}>
                                <Button onClick={handlerBuy}>{t("buy")}</Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2 className={styles.title2}>{t('empty_basket')}</h2>
                        </div>
                    )}
                </div>
                : step === 1 ? <Step1 next={() => setStep(2)} setValues={setValues} prevStep={() => setStep(0)}/>
                    : step === 2 ? <Step2 total={total} region={values?.region} next={() => setStep(3)} setValues={setValues} prevStep={() => setStep(1)}/>
                        : step === 3 ? <Step3 submitForm={handleSubmit} inputValues={values} setValues={setValues}
                                              prevStep={() => setStep(2)}/>
                            : null
            }
            <Products products={products}/>
        </div>
    );
};

export default Basket;
