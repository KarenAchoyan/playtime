import React, {useEffect, useState} from 'react';
import styles from "../../styles/review.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getSlogan} from "../../store/slogan/actions";
import {useRouter} from "next/router";
import {Skeleton} from "antd";
import Image from "next/image";

const Review = () => {
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();
    const slogan = useSelector(state => state.slogan.about);
    const [content, setContent] = useState("")
    useEffect(() => {
        dispatch(getSlogan.request())
    }, [dispatch]);

    const router = useRouter();

    const {locale} = router;

    useEffect(() => {
        const content = (locale === 'en') ? slogan?.content_1_en : (locale === 'ru') ? slogan?.content_1_ru : slogan?.content_1
        setContent(content)
        setIsLoading(false)
    }, [locale, slogan])


    return (
        <div>
            {isLoading ?
                <Skeleton style={{width: "90%", margin: 'auto'}}/>
                :
                <div className={styles.content}>
                    <div className={styles.imageParent}>
                        <Image priority width={1000} height={500} src={process.env.IMAGE_URL2 +slogan?.image1} alt='Review' className={styles.image}/>
                        <div className={styles.info} style={{color: slogan?.color}}>
                            <p dangerouslySetInnerHTML={{__html: content}}></p>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
};

export default Review;