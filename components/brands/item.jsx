import React from 'react';
import styles from "../../styles/brands.module.css";
import Image from "next/image";

const Item = ({item}) => {
    return (
        <div className={styles.item}>
            <div>
                <Image width={500} height={500} src={process.env.IMAGE_URL2 +item.avatar} alt=""/>
            </div>
            <h3>{item.name}</h3>
            <h4>15 items</h4>
        </div>
    );
};

export default Item;