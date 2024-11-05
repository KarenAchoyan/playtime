import React from 'react';
import App from "../../components/Layouts/app";
import styles from "../../styles/blog.module.css"
import {t} from "../../utils/utils";

const Index = () => {
    return (
        <div>
            <App>
                <div className={`${styles.title} ${styles.privacyTitle}`}>
                    <h1>{ t("title_1") }</h1>
                    <p>{t("paragraph_1")}</p>
                </div>
                <div className={`${styles.text} ${styles.textPrivacy}`}>
                    <h2>{ t("title_2") }</h2>
                    <p>{t("paragraph_2")}</p>
                    <h2>{ t("title_3") }</h2>
                    <p>{t("paragraph_3")}</p>
                    <h2>{ t("title_3") }</h2>
                    <p>{t("paragraph_3")}</p>
                </div>
            </App>
        </div>
    );
};

export default Index;