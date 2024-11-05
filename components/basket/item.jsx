import React, {useContext, useEffect, useState} from 'react';
import styles from "../../styles/basket.module.css";
import {CloseOutlined, HeartFilled, HeartOutlined} from "@ant-design/icons";
import BasketContext from 'providers/BasketContext';
import CountContext from 'providers/countContext';
import RateContext from "../../providers/rateContext";
import {Image} from "antd";
import {t, truncateContent} from "../../utils/utils";
import {useRouter} from "next/router";

const Item = ({item, onRemove,updateBasketItemQuantity, removeFavorite}) => {
    const [quantity, setQuantity] = useState(item.quantity)
    const {addFavorite, isFavorite} = useContext(BasketContext);
    const {price, currentRate} = useContext(RateContext)
    const [title, setTitle] = useState("");
    const [metal, setMetal] = useState("")
    const {count, setCount} = useContext(CountContext)

    useEffect(()=>{
        updateBasketItemQuantity(item.id,quantity)
    },[item.id, quantity])
    const router = useRouter();

    const {locale} = router;

    function addFav(){
        setCount((prev)=>{
            return{
                ...prev,
                favorite:++prev.favorite
            }
        })
        addFavorite(item)
    }
    function removeFav(){
        setCount((prev)=>{
            return{
                ...prev,
                favorite:--prev.favorite
            }
        })
        removeFavorite(item)
    }
    function increment(){
        setQuantity((prev)=>{
            return ++prev;
        })

    }
    function decrement(){
        setQuantity((prev)=>{
            return prev > 1 ? --prev : prev;
        })

    }
    useEffect(() => {
        const t = (locale === 'en') ? item?.title_en : (locale === 'ru') ? item?.title_ru : item?.title
        const m = (locale === 'en') ? item?.metal_en : (locale === 'ru') ? item?.metal_ru : item?.metal
        setTitle(t)
        setMetal(m)
    }, [locale, item])

    return (
        <div className={styles.basketDiv}>
            <div>
                <div className={styles.basketPicture}>
                    <Image preview={false} src={process.env.IMAGE_URL2 +item.avatar} alt=""/>
                </div>
                <div className={styles.basketText}>
                    <div className={styles.basketSpan}>
                        <span>{truncateContent(title, 27)}</span>
                    </div>
                    <div className={styles.basketParagraph}>
                        <p>{t("model")}՝ {item.model}</p>
                    </div>
                </div>
            </div>
            <div className={styles.basketItem}>
                <div className={styles.buttons}>
                    <button onClick={decrement}>-</button>
                    <span>{quantity}</span>
                    <button onClick={increment}>+</button>
                </div>
                <div className={styles.price}>
                    <span>{price(item.price*item.quantity)} {currentRate?.current}</span>
                </div>
                <div className={styles.icons}>
                    <ul>
                        <li>
                            {isFavorite(item) ? 
                             <HeartFilled onClick={removeFav}/>
                                 :
                             <HeartOutlined onClick={addFav}/>
                            }
                            </li>
                        <li><CloseOutlined onClick={()=>onRemove(item)}/></li>
                    </ul>
                </div>
                <div className={styles.mobileTitle}>
                    <div className={styles.basketText}>
                        <div className={styles.basketSpan}>
                            <span>{item.label}</span>
                        </div>
                        <div className={styles.basketParagraph}>
                            <p>Մոդելի համար՝ 19940001-58</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;