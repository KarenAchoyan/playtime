import React from 'react';
import styles from "../../styles/brands.module.css";
import Image from "next/image";
import Link from "next/link";

const Item = ({item}) => {
    return (
        <div className={styles.item}>
            <div>
                <Link href={item.url}>
                    <Image width={500} height={500} src={process.env.IMAGE_URL2 +item.avatar} alt=""/>
                </Link>
            </div>
            <h3>{item.name}</h3>
            <h4>{item.count} items</h4>
        </div>
    );
};

export default Item;