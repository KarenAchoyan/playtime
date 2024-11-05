import React, {useEffect, useState} from 'react';
import styles from "../../styles/header.module.css";
import {useRouter} from "next/router";
import {DownOutlined} from "@ant-design/icons";
import {languages} from "../../utils/utils";
import Link from "next/link";
import {Image} from "antd";

const LanguageSwitcher = ({setIsOpenDrb, isOpenDrbFlag, setIsOpenDrbFlag}) => {
    const router = useRouter();
    const [currentLanguage, setCurrentLanguage] = useState('Հայ')
    const [currentFlag, setCurrentFlag] = useState('/amFlag.png')
    const [langs, setLangs] = useState([]);
    const { pathname, asPath, query } = router
    const [set, setSet] = useState(false)
    const {locale} = router;
    useEffect(() => {
        const language = languages.find(x=>x.value===locale);
        setCurrentFlag(language.flag)
        setCurrentLanguage(language.name)
    }, [router]);

    useEffect(() => {
        setLangs(languages.filter(x => x.name !== currentLanguage))
    }, [currentLanguage])

    const changeLanguage = (newLang, item) => {
        setCurrentLanguage(item.name)
        setCurrentFlag(item.flag)
        const l = JSON.stringify({name: item.name, flag: item.flag})
        localStorage.setItem('lang', l);
        const scrollY = window.scrollY; // Save the current scroll position
        router.push(router.asPath, undefined, { locale: newLang }).then(() => {
            window.scrollTo(0, scrollY);
        });
    };




    return (
        <li className={styles.languageForSize} onClick={()=>changeLanguage(langs[0]?.value, langs[0])}>
            <Image preview={false} src={langs[0]?.flag} alt=""/>
            <span>{langs[0]?.name}  </span>
        </li>


    );
};

export default LanguageSwitcher;