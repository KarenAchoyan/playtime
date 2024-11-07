import React, { useEffect, useState } from 'react';
import styles from "../../styles/footer.module.css"

import { useRouter } from "next/router";
import Link from "next/link";
import { t } from "../../utils/utils";
import Image from "next/image";

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
            <div className={styles.footer}>
               <div className={styles.clouds}>
                   <Image width={200} height={300} src="/cloud-2.svg" alt=""/>
                   <Image width={200} height={300} src="/cloud-3.svg" alt=""/>
                   <Image width={200} height={300} src="/footer-bottom-shape-1.svg" alt=""/>
                   <Image width={200} height={300} src="/footer-doll-left.svg" alt=""/>
                   <Image width={200} height={300} src="/footer-doll-right.svg" alt=""/>

                   <Image width={200} height={300} src="/cloud-4.svg" alt=""/>
               </div>
            </div>
        </div>
    );
};

export default Footer;
