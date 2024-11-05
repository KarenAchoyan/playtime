import React from 'react';
import Header from "../../components/Header/header";
import Faq from "../../components/Faq/faq";
import Footer from "../../components/Footer/footer";
import App from "../../components/Layouts/app";

const Index = () => {
    return (
        <>
            <Faq/>
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

