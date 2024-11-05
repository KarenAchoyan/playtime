import React from 'react';
import App from "../../components/Layouts/app";
import styles from "../../styles/payment.module.css"
import Image from "next/image";
const Failed = () => {
    return (
        <div>
            <App>
                <div className={styles.background}>
                    <Image width={300} height={200} src="/failed.png" alt=""/>
                    <h2>Ձախողում </h2>
                    </div>
            </App>
        </div>
    );
};

export default Failed;