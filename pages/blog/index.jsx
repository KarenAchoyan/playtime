import React from 'react';
import Header from "../../components/Header/header";
import Blog from "../../components/Blog/blog";
import Footer from "../../components/Footer/footer";
import App from "../../components/Layouts/app";

const Index = () => {
    return (
        <>
            <Blog/>
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

