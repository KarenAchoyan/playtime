import React, {useContext, useEffect, useState} from 'react';
import styles from "../../styles/favorite.module.css"
import Item from "./item";
import Button from "../ui/button/button";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import Products from "../Products/products";
import BasketContext from 'providers/BasketContext';
import CountContext from 'providers/countContext';
import {useDispatch, useSelector} from "react-redux";
import App from "../Layouts/app";
import {t} from "../../utils/utils";

const Favorite = () => {
    const [basketItems, setBasketItems] = useState([]);
    const {favorites, removeFromFavorite, isBasket} = useContext(BasketContext)
    const {setCount} = useContext(CountContext)

    const products = useSelector((state) => state.product.products) || [];

    useEffect(() => {
        setBasketItems(favorites)
    }, [favorites])


    const handleRemove = (itemToRemove) => {
        setCount((prev) => {
            return {
                ...prev,
                favorite: --prev.favorite
            }
        })
        removeFromFavorite(itemToRemove)
    };

    return (
        <div>
            <App>
                <div className={styles.favorite}>
                    {basketItems.length > 0 ? <div className={styles.title}>
                        <h1>Նախնտրելի</h1>
                    </div> : null}
                    {basketItems.length > 0 ?
                        <div>
                            <div className={styles.row}>
                                {basketItems.map((item) => (
                                    <Item onRemove={handleRemove} key={item.id} item={item}/>
                                ))}
                            </div>
                        </div>
                        : <div>
                            <h2 className={styles.title2}>{t("wishlist_empty")}</h2>
                        </div>}
                </div>
                <Products products={products}/>
            </App>
        </div>
    )

};

export default Favorite;