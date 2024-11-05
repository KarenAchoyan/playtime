import React, {useContext, useEffect} from 'react';
import styles from "../../styles/header.module.css";
import Link from "next/link";
import {CloseOutlined} from "@ant-design/icons";
import Select from "../ui/select/select";
import Input from "../ui/input/input";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../../store/category/actions";
import {Image} from "antd";
import RateContext from "../../providers/rateContext";
import {languages} from "../../utils/utils";

const MobileMenu = ({handlerClose,handlerClosing}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {change,currentRate,rates} = useContext(RateContext)

    const {locale} = router;

    const categories = useSelector((state) => state.category?.categories) || [];
    useEffect(() => {
        dispatch(getCategories.request());
    }, [dispatch])

    function changeRate(e) {
        change({current: e.target.value})
    }
    function changeLanguage(e){
        router.push(router.asPath, undefined, { locale: e.target.value });
    }
    useEffect(() => {
        router.events.on('routeChangeComplete', handlerClosing);

        return () => {
            router.events.off('routeChangeComplete', handlerClosing);
        };
    }, []);
    return (
        <div className={styles.mobileMenuLists}>
            <div className={styles.headerMobileMenu}>
                <span className={styles.closeIcon} onClick={handlerClose}>
                    <CloseOutlined/>
                </span>
            </div>

            <div className={styles.mobileTools}>
                <div className="languages-mobile">
                    <Select onChange={changeLanguage}>
                        <option value={locale}>{locale==='ru' ? "RU" : locale==='en' ? "EN" : "ՀԱՅ"}</option>
                        {languages.filter(x=>x.value!==locale).map((item) => (
                            <option key={item.id} value={item.value}>{item.name}</option>
                        ))}
                    </Select>
                </div>
                <div className="current-mobile">
                    <Select onChange={changeRate}>
                        <option>{currentRate.current}</option>
                        {rates.filter(x=>x.current !== currentRate.current).map(x=>(
                            <option key={x.id}>{x.current}</option>
                        ))}
                    </Select>
                </div>
            </div>

            <div className={styles.lists}>
                <ul>
                    {categories.map((item) => {
                        const {name, name_en, name_ru, id} = item;
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const router = useRouter();
                        const isActive = router.query.category === name;
                        const title = (locale === 'en') ? name_en : (locale === 'ru') ? name_ru : name
                        return (
                            <li key={id} className={isActive ? styles.activeCategory : null}>
                                <Link href={`/products/${id}`}>
                                    {title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default MobileMenu;