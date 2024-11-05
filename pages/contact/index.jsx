import React from 'react';
import Header from "../../components/Header/header";
import Contactus from "../../components/Contactus/contactus";
import Footer from "../../components/Footer/footer";
import App from "../../components/Layouts/app";

const Index = () => {
    return (
        <>
            <Contactus/>
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

