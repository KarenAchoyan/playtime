import React, { useEffect, useState } from 'react';
import styles from "../../styles/footer.module.css"
import {
    FacebookOutlined,
    InstagramOutlined,
    MailOutlined,
    PhoneOutlined,
    PushpinOutlined
} from "@ant-design/icons";
import Lastpage from "../Lastpage/lastpage";
import { useRouter } from "next/router";
import Link from "next/link";
import { t } from "../../utils/utils";
import { Image } from "antd";

const Footer = ({ contact, categories }) => {
    const [addresses, setAddresses] = useState([])
    const router = useRouter();
    const { locale } = router;
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const t = contact?.addresses || "[]"
        const address = JSON.parse(t);
        const newArr = address.map((item) => {
            return item.address;
        })
        setAddresses(newArr)
    }, [contact])

    return (
        <div>
            <footer className={styles.footer}>
                <div>
                    <Image preview={false} src="/logo.png" alt="logo" className="logo" />
                </div>
                <div className={styles.pages}>
                    <div>
                        <h4>{t("categories")}</h4>
                        <ul>
                            {categories.map((item) => {
                                const { name, name_ru, id } = item;
                                const isActive = router.query.category === name;
                                const title = (locale === 'ru') ? name_ru : name
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
                    <div>
                        <h4>{t("pages")}</h4>
                        <ul>
                            <li><Link href={'/about'}>{t("about_us")}</Link></li>
                            <li><Link href={'/contact'}>{t("contact_us")}</Link></li>
                            <li><Link href={'/faqs'}>FAQ</Link></li>
                            <li><Link href={'/blog'}>{t('blog')}</Link></li>
                            <li><Link href={'/privacy'}>Privacy and Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>{t("feedback")}</h4>
                        <ul>
                            <li><span><MailOutlined /></span><a href={"mailto:" + contact.email}>{contact.email}</a></li>
                            <li><span><PhoneOutlined /></span><a
                                href={`whatsapp://send?phone=${contact.phone}`}>{contact.phone}</a></li>
                        </ul>

                    </div>
                </div>
            </footer>
            <Lastpage scroll={scroll} />
        </div>
    );
};

export default Footer;
