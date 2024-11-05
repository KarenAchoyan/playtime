import React, {useEffect} from 'react';
import Details from "../../components/Products/Details/details";
import Products from "../../components/Products/products";
import {useDispatch, useSelector} from "react-redux";
import App from "../../components/Layouts/app";
import styles from "../../styles/products.module.css"
import {getImportantProducts, getProductsAll} from "../../store/products/actions";

const Index = () => {
    const products = useSelector((state) => state?.product?.importantProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getImportantProducts.request());
    }, [dispatch]);
    return (
        <div>
            <Details/>
            <div className={styles.detailsMargin}>
                <hr/>
                <Products products={products}/>
            </div>
        </div>
    );
};

Index.getLayout = function getLayout(page) {
    return (
        <App>
            {page}
        </App>
    )
}

export default Index;

