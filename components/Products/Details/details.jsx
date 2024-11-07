import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import styles from "../../../styles/details.module.css"
import {CheckOutlined, HeartOutlined, ShoppingOutlined} from "@ant-design/icons";

import Button from "../../ui/button/button";
import Notification from "../../notification/notification";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../../../store/products/actions";
import CountContext from "../../../providers/countContext";
import BasketContext from "../../../providers/BasketContext";
import RateContext from "../../../providers/rateContext";
import {t} from "../../../utils/utils";
import {Skeleton} from "antd";
import Image from "next/image";

const Details = () => {
    const product = useSelector((state) => state.product?.selectedProduct?.data);
    const isFetching = useSelector((state) => state.product?.isFetching);
    const [isShow, setIsShow] = useState(false);
    const {setCount} = useContext(CountContext)
    const {add, remove, isFavorite, isBasket, removeFromFavorite, addFavorite} = useContext(BasketContext)
    const {price, currentRate} = useContext(RateContext)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const dispatch = useDispatch();
    const router = useRouter();
    const {name} = router.query;
    const {locale} = router;
    const stylesNotification = {
        transform: isShow ? "translate(0%)" : "translate(150%)"
    }
    const [isAtTargetSection, setIsAtTargetSection] = useState(false);

    function addNotification() {
        setIsShow(true)
        setTimeout(() => {
            setIsShow(false)
        }, 2000)
    }

    useEffect(() => {
        dispatch(getProduct.request({id: name}));
    }, [dispatch, name])

    useEffect(() => {
        const t = (locale === 'ru') ? product?.title_ru : product?.title
        const m = (locale === 'ru') ? product?.description : product?.description
        setTitle(t)
        setDescription(m)
    }, [locale, product])


    const addToBaskets = useCallback(() => {
        addNotification()
        setCount((prev) => {
            return {
                ...prev,
                basket: ++prev.basket
            }
        });
        add(product)
    }, [product, add, setCount]);
    const removeToBasket = useCallback(() => {
        setCount((prev) => {
            return {
                ...prev,
                basket: --prev.basket
            }
        });
        remove(product)
    }, [product, remove, setCount])

    const addToFavorites = () => {
        addNotification()
        addFavorite(product)
        setCount((prev) => {
            return {
                ...prev,
                favorite: ++prev.favorite
            }
        })
    };

    const removeToFavorite = useCallback(() => {
        setCount((prev) => {
            return {
                ...prev,
                favorite: --prev.favorite
            }
        });
        removeFromFavorite(product)
    }, [product, removeFromFavorite, setCount])

    return (
        <div className={styles.container}>
            <Skeleton loading={isFetching} active>
                <div className={styles.productRow}>
                    <div className={styles.images}>
                        <Image width={900} height={1000} src={process.env.IMAGE_URL2 + product?.avatar} alt=""/>
                        {product?.images.map((item, index) => (
                            <Image key={index} width={900} height={1000} src={process.env.IMAGE_URL + item?.image}
                                   alt=""/>
                        ))}
                    </div>
                    <div className={`${styles.text}`}
                    >
                        <h1>Denim Jumpsuit {}</h1>
                        <p>
                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
                            egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec
                            eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat
                            eleifend leo.
                        </p>
                        <h2>$39.99</h2>
                        <div className={styles.row}>
                            {!isBasket(product) ?
                                <button className={styles.addToBasketBtn} onClick={addToBaskets}>
                                    {t("add")}
                                    <span><ShoppingOutlined/></span>
                                </button>
                                :
                                <button className={styles.addToBasketBtn} style={{background: '#D09F4E'}}
                                        onClick={removeToBasket}>
                                    {t("remove")}
                                    <span><ShoppingOutlined/></span>
                                </button>
                            }
                            {!isFavorite(product) ?
                                <button className={styles.addToBasketBtn} onClick={addToFavorites}>
                                    {t("add")}
                                    <span><HeartOutlined/></span>
                                </button>
                                :
                                <button className={styles.addToBasketBtn} style={{background: '#D09F4E'}}
                                        onClick={removeToFavorite}>
                                    {t("remove")}
                                    <span><HeartOutlined/></span>
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </Skeleton>
            <Notification style={stylesNotification}>
                <span className="icon">
                    <CheckOutlined/>
                </span>
                <span>{t("added_basket")}</span>
            </Notification>
        </div>

    )
        ;
};

export default Details;