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
            <Lastpage scroll={scroll} />
        </div>
    );
};

export default Footer;
