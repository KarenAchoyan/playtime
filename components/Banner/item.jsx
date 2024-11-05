import React, {useEffect, useState} from 'react';
import styles from "../../styles/banner.module.css";
import {Skeleton} from "antd";
import Image from "next/image";

const Item = ({item}) => {
    const [isLoading, setIsLoading] = useState(true)
    return (
        <div className={styles.bannerItem}>
            <div className={styles.products}>
                <a href={item.url}>
                    {isLoading ?
                        <Skeleton.Image active={true}/>
                        :
                        null
                    }
                    <Image src={process.env.IMAGE_URL2  + item.image}
                           style={{opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s'}}
                           onLoad={() => setIsLoading(false)}
                           width={1200}
                           height={500}
                           alt="banner image"/>

                </a>
            </div>
        </div>
    );
};

export default Item;