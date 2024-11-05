import React, {useEffect, useState} from 'react';
import styles from "../../styles/faq.module.css";
import {DownOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";

const Item = ({item, setId}) => {

    const [contentOpen, setContentOpen] = useState(false)
    const router = useRouter();
    const {locale} = router;
    const [itemId, setItemId] = useState(null);

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("")

    useEffect(() => {
        const t = (locale === 'en') ? item?.answer_en : (locale === 'ru') ? item?.answer_ru : item?.answer_hy
        const m = (locale === 'en') ? item?.question_en : (locale === 'ru') ? item?.question_ru : item?.question_hy
        setAnswer(t)
        setQuestion(m)
    }, [locale, item])


    function handlerOpen() {
        setContentOpen(!contentOpen)
    }

    const styleArrow = {
        transform: 'rotate(-180deg)'
    }
    return (
        <div className={styles.faqItems} onClick={handlerOpen}>

            <div className={styles.faqInfo}>
                <div>
                    <p>{question}</p>
                    {contentOpen ?
                        <span onClick={handlerOpen} style={styleArrow}>
                         <DownOutlined/>
                      </span>
                        :
                        <span onClick={handlerOpen}>
                         <DownOutlined/>
                      </span>
                    }
                </div>
                <div className={`${styles.drbInfo} ${contentOpen ? styles.active : styles.deactive}`}>
                    <div className={styles.drbInfoRaw}>
                        <p>{answer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;