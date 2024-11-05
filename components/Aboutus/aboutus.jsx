import React, {useEffect, useState} from 'react';
import styles from "../../styles/aboutus.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getAbout} from "../../store/about/actions";
import {useRouter} from "next/router";
import {Image} from "antd";
import {t} from "../../utils/utils";

const Aboutus = () => {
    const dispatch = useDispatch();

    const about = useSelector((state) => state.contact.about);

    const [content, setContent] = useState("")
    const [content1, setContent1] = useState("")

    const router = useRouter()
    useEffect(() => {
        dispatch(getAbout.request());
    }, [dispatch]);



    const {locale} = router;


    useEffect(() => {
        const content = (locale === 'en') ? about.content_1_en : (locale === 'ru') ? about.content_1_ru : about.content_1
        const content2 = (locale === 'en') ? about.content_2_en : (locale === 'ru') ? about.content_2_ru : about.content_2
        setContent(content)
        setContent1(content2)
    }, [locale,about])

    return (
        <div>
            <div className={styles.page}>
                <div className={styles.pageRaw}>
                    <div className={styles.text}>
                        <h3>{t("about_us")}</h3>
                        <p dangerouslySetInnerHTML={{__html: content}}></p>
                    </div>
                    <div className={styles.picture}>
                    <Image preview={false} src={process.env.IMAGE_URL2 +about.image1} alt=""/>
                    </div>
                </div>
                <div className={`${styles.pageRaw} ${styles.mobileReverse}`}>
                    <div className={styles.picture}>
                        <Image preview={false} src={process.env.IMAGE_URL2  + about.image2} alt=""/>
                    </div>
                    <div className={styles.text}>
                        <p dangerouslySetInnerHTML={{__html: content1}}></p>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Aboutus;