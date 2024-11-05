import React, {useContext, useEffect, useState} from 'react';
import styles from "../../styles/header.module.css"
import Image from "next/image";
import {useRouter} from "next/router";
import RateContext from "../../providers/rateContext";
import Link from "next/link";

const ItemSearch = ({item}) => {
    const [title, setTitle] = useState("");
    const router = useRouter();
    const {locale} = router;
    const {price, currentRate} = useContext(RateContext)


    useEffect(() => {
        const t = (locale === 'ru') ? item?.title_ru : item?.title
        setTitle(t)
    }, [locale, item])
    return (
        <>
            <Link className={styles.links} href={"/product/"+item.id}>
                <div className={styles.searchItemProduct}>
                    <div className={styles.avatarResult}>
                        <Image src={process.env.IMAGE_URL2 + item.avatar} width={100} height={100}
                               alt={"image avatar"}/>
                    </div>
                    <div className={styles.infoSearch}>
                        <h2>{title}</h2>
                        <p>{price(item.price)} {currentRate?.current}</p>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default ItemSearch;