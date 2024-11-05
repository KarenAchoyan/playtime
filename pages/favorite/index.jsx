import Header from "components/Header/header";
import Footer from "components/Footer/footer";
import Favorite from "components/Favorite/favorite";
import App from "../../components/Layouts/app";
import React from "react";

const Index = () => {
    return(
        <>
            <Favorite/>
        </>
    )
}



Index.getLayout = function getLayout(page) {
    return (
        <App>
            {page}
        </App>
    )
}

export default Index;
