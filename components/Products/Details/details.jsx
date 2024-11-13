import React, {useCallback, useContext, useEffect, useState} from 'react';
import styles from "../../../styles/details.module.css";
import {CheckOutlined, HeartOutlined, ShoppingOutlined} from "@ant-design/icons";

import Buttons from "../../ui/button/button";
import Notification from "../../notification/notification";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../../../store/products/actions";
import CountContext from "../../../providers/countContext";
import BasketContext from "../../../providers/BasketContext";
import RateContext from "../../../providers/rateContext";
import {t} from "../../../utils/utils";
import {List, Rate, Input, Button, Divider, Skeleton} from 'antd';
import Image from "next/image";
import {addReview, getReviews} from "../../../store/reviews/actions";
import ReviewBox from "./reviewBox";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

const Details = () => {
    const product = useSelector((state) => state.product?.selectedProduct?.data);
    const reviews = useSelector(state => state?.review?.reviews);
    const isFetching = useSelector((state) => state.product?.isFetching);
    const [isShow, setIsShow] = useState(false);
    const {setCount} = useContext(CountContext);
    const {add, remove, isFavorite, isBasket, removeFromFavorite, addFavorite} = useContext(BasketContext);
    const {price, currentRate} = useContext(RateContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();
    const {name} = router.query;
    const {locale} = router;
    const stylesNotification = {
        transform: isShow ? "translate(0%)" : "translate(150%)"
    };

    useEffect(() => {
        dispatch(getProduct.request({id: name}));
    }, [dispatch, name]);

    useEffect(() => {
        if (product?.id) {
            dispatch(getReviews.request({id: product.id}));
        }
    }, [dispatch, product]);

    useEffect(() => {
        const t = (locale === 'ru') ? product?.title_ru : product?.title;
        const m = (locale === 'ru') ? product?.description : product?.description;
        setTitle(t);
        setDescription(m);
    }, [locale, product]);

    const addToBaskets = useCallback(() => {
        addNotification();
        setCount((prev) => ({
            ...prev,
            basket: ++prev.basket
        }));
        add(product);
    }, [product, add, setCount]);

    const removeToBasket = useCallback(() => {
        setCount((prev) => ({
            ...prev,
            basket: --prev.basket
        }));
        remove(product);
    }, [product, remove, setCount]);

    const addToFavorites = () => {
        addNotification();
        addFavorite(product);
        setCount((prev) => ({
            ...prev,
            favorite: ++prev.favorite
        }));
    };

    function addNotification() {
        setIsShow(true);
        setTimeout(() => {
            setIsShow(false);
        }, 2000);
    }

    const removeToFavorite = useCallback(() => {
        setCount((prev) => ({
            ...prev,
            favorite: --prev.favorite
        }));
        removeFromFavorite(product);
    }, [product, removeFromFavorite, setCount]);


    return (
        <div className={styles.container}>
            <Skeleton loading={isFetching} active>
                <div className={styles.productRow}>
                    <div className={styles.images}>

                        <InnerImageZoom  src={process.env.IMAGE_URL2 + product?.avatar} zoomSrc={process.env.IMAGE_URL2 + product?.avatar} />

                        {product?.images?.map((item, index) => (
                            <InnerImageZoom key={index} src={process.env.IMAGE_URL + item?.image} zoomSrc={process.env.IMAGE_URL + item?.image} />
                        ))}
                    </div>

                    <div className={`${styles.text}`}>
                        <h1>{title}</h1>
                        <p>{description}</p>
                        <h2>{price(product?.price)} {currentRate?.current}</h2>
                        <div className={styles.row}>
                            {!isBasket(product) ? (
                                <Buttons type="primary" icon={<ShoppingOutlined/>} onClick={addToBaskets}>
                                    {t("add")}
                                </Buttons>
                            ) : (
                                <Buttons type="primary" icon={<ShoppingOutlined/>} style={{backgroundColor: '#D09F4E'}}
                                         onClick={removeToBasket}>
                                    {t("remove")}
                                </Buttons>
                            )}
                        </div>
                        <div className={styles.desctopTime}>
                            <ReviewBox product={product} reviews={reviews}/>
                        </div>
                    </div>
                </div>

                <div className={styles.mobileTime}>
                    <ReviewBox product={product} reviews={reviews}/>
                </div>
            </Skeleton>

            <Notification style={stylesNotification}>
        <span className="icon">
          <CheckOutlined/>
        </span>
                <span>{t("added_basket")}</span>
            </Notification>
        </div>
    );
};

export default Details;
