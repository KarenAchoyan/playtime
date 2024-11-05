import React, {useContext} from 'react';
import Header from "../../components/Header/header";
import Basket from "../../components/basket/basket";
import Products from "../../components/Products/products";
import App from "../../components/Layouts/app";

const Index = () => {
    return (
        <>
           <Basket/>
        </>
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
