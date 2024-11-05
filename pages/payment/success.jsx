import React from 'react';
import App from "../../components/Layouts/app";
import styles from "../../styles/payment.module.css"
const Success = () => {
    return (
        <div>
            <App>
                <div className={styles.background}>
                    <img src="/check.png" alt=""/>
                    <h2>Շնորհակալություն </h2>
                    <h4>Գնումների համար</h4>
                </div>
            </App>
        </div>
    );
};

export default Success;