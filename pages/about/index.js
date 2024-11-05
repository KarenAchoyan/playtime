import React from 'react';
import Header from "../../components/Header/header";
import Aboutus from "../../components/Aboutus/aboutus";
import Footer from "../../components/Footer/footer";
import App from "../../components/Layouts/app";

const Index = () => {
    return (
        <div>
            <App>
                <Aboutus/>
            </App>
        </div>
    );
};

export default Index;
