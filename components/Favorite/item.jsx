import React, {useContext, useCallback, useState, useEffect} from 'react';
import styles from "../../styles/favorite.module.css";
import {
    HeartFilled,
    CheckOutlined,
    ShoppingOutlined, ShoppingFilled
} from "@ant-design/icons";
import BasketContext from 'providers/BasketContext';
import CountContext from 'providers/countContext';
import Notification from 'components/notification/notification';
import RateContext from "../../providers/rateContext";
import {Image} from "antd";
import {t, truncateContent} from "../../utils/utils";
import {useRouter} from "next/router";

const Item = ({item, onRemove}) => {
    const {add, remove, isBasket} = useContext(BasketContext);
    const {setCount} = useContext(CountContext)
    const [isShow, setIsShow] = useState(false);
    const {price, currentRate} = useContext(RateContext)

    const [title, setTitle] = useState("");
    const [metal, setMetal] = useState("")
    const stylesNotification = {
        transform: isShow ? "translate(0%)" : "translate(150%)"
    }
    const router = useRouter();

    const {locale} = router;

    const addToBaskets = useCallback(() => {
        setCount((prev) => {
            return {
                ...prev,
                basket: ++prev.basket
            }
        });
        add(item)
        setIsShow(true)
        setTimeout(() => {
            setIsShow(false)
        }, 2000)
    }, [item, setCount, add]);

    const removeToBasket = useCallback(() => {
        setCount((prev) => {
            return {
                ...prev,
                basket: --prev.basket
            }
        });
        remove(item)
    }, [item])
    useEffect(() => {
        const t = (locale === 'en') ? item?.title_en : (locale === 'ru') ? item?.title_ru : item?.title
        const m = (locale === 'en') ? item?.metal_en : (locale === 'ru') ? item?.metal_ru : item?.metal
        setTitle(t)
        setMetal(m)
    }, [locale, item])
    return (
        <div className={styles.favoriteDiv}>
            <div>
                <div className={styles.favoritePicture}>
                    <Image preview={false} src={process.env.IMAGE_URL2  + item.avatar} alt=""/>
                </div>
                <div className={styles.favoriteText}>
                    <div className={styles.favoriteSpan}>
                        <span>{truncateContent(title, 27)}</span>
                    </div>
                    <div className={styles.favoriteParagraph}>
                        <p>{t("model")}՝ {item.model}</p>
                    </div>
                </div>
            </div>
            <div className={styles.favoriteItem}>
                <div className={styles.favoriteRow}>
                    <div className={styles.price}>
                        <span>{price(item.price)} {currentRate?.current}</span>
                    </div>
                    <div className={styles.rowR}>
                        <div className={styles.qrCode}>
                            <Image preview={false} src={process.env.IMAGE_URL  + item.blog?.qrs?.image}
                                   alt=""/>
                        </div>
                        <div className={styles.mobileIcons}>
                            <div className={styles.icons}>
                                <ul>
                                    <li><HeartFilled onClick={() => onRemove(item)}/></li>
                                    <li><ShoppingOutlined/></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.icons}>
                    <ul>
                        <li><HeartFilled onClick={() => onRemove(item)}/></li>

                        <li>
                            {!isBasket(item) ?
                                <ShoppingOutlined onClick={addToBaskets}/>
                                :
                                <ShoppingFilled onClick={removeToBasket}/>
                            }
                        </li>
                    </ul>
                </div>
                <div className={styles.mobileTitle}>
                    <div className={styles.favoriteText}>
                        <div className={styles.favoriteSpan}>
                            <span>{item.label}</span>
                        </div>
                        <div className={styles.favoriteParagraph}>
                            <p>Մոդելի համար՝ 19940001-58</p>
                        </div>
                    </div>
                </div>
            </div>
            <Notification style={stylesNotification}>
                <span className="icon">
                    <CheckOutlined/>
                </span>
                <span>{t("added_basket")}</span>
            </Notification>


        </div>
    );
};

export default Item;