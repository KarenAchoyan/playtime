import {useIntl} from "react-intl";
import React, {useEffect, useState} from "react";
import NProgress from "nprogress";
import Router from "next/router";
import styles from "../styles/header.module.css";
import 'nprogress/nprogress.css';
import * as XLSX from 'xlsx';

NProgress.configure({showSpinner: false});

export const Loader = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = () => {
            setLoading(true);
            NProgress.start();
        };

        const end = () => {
            setLoading(false);
            NProgress.done();
        };

        Router.events.on('routeChangeStart', start);
        Router.events.on('routeChangeComplete', end);
        Router.events.on('routeChangeError', end);

        return () => {
            Router.events.off('routeChangeStart', start);
            Router.events.off('routeChangeComplete', end);
            Router.events.off('routeChangeError', end);
        };
    }, []);

    return loading ? <div className={styles.loaderPage}><img src="/2.png"/></div> : null;
};


export function truncateContent(content, maxLength) {
    if (content?.length <= maxLength) {
        return content;
    } else {
        // Truncate content and add "..." at the end
        return content?.substring(0, maxLength) + "...";
    }
}

export const jsonToExcel = (json, filename = 'orders.xlsx') => {
    if (!Array.isArray(json)) {
        console.error('Invalid input: Expected an array but got', typeof json);
        return;
    }

    const ws = XLSX.utils.json_to_sheet(json);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
    XLSX.writeFile(wb, filename);
};

export function isTruncContent(content, maxLength) {
    if (content.length <= maxLength) {
        return false;
    } else {
        // Truncate content and add "..." at the end
        return true
    }
}


export const languages = [
    {id: 2, name: "RU", fullName: "Russian", value: 'ru', flag: "/ru.png"},
    {id: 3, name: "Հայ", fullName: "Հայերեն", value: 'hy', flag: "/amFlag.png"},
];

export const regions = [
    {"id": 1, "label_en": "Yerevan", "label_ru": "Ереван", "label": "Երևան", "value": "Yerevan"},
    {"id": 2, "label_en": "Kotayq", "label_ru": "Котайк", "label": "Կոտայք", "value": "Kotayq"},
    {"id": 3, "label_en": "Shirak", "label_ru": "Ширак", "label": "Շիրակ", "value": "Shirak"},
    {"id": 4, "label_en": "Lori", "label_ru": "Лори", "label": "Լոռի", "value": "Lori"},
    {"id": 5, "label_en": "Aragacotn", "label_ru": "Арагацотн", "label": "Արագածոտն", "value": "Aragacotn"},
    {"id": 6, "label_en": "Tavush", "label_ru": "Тавуш", "label": "Տավուշ", "value": "Tavush"},
    {"id": 7, "label_en": "Vayots Dzor", "label_ru": "Вайоц Дзор", "label": "Վայոց Ձոր", "value": "Vayots Dzor"},
    {"id": 8, "label_en": "Syunik", "label_ru": "Сюник", "label": "Սյունիք", "value": "Syunik"},
    {"id": 9, "label_en": "Armavir", "label_ru": "Армавир", "label": "Արմավիր", "value": "Armavir"},
    {"id": 10, "label_en": "Gegharkunik", "label_ru": "Гегаркунак", "label": "Գեղարքունիք", "value": "Gegharkunik"},
    {"id": 11, "label_en": "Aragatsotn", "label_ru": "Арагацотн", "label": "Արագածոտն", "value": "Aragatsotn"},
    {"id": 12, "label_en": "Russia", "label_ru": "Россия", "label": "Ռուսաստան", "value": "Russia"},
    {"id": 13, "label_en": "USA", "label_ru": "USA", "label": "ԱՄՆ", "value": "USA"}
]

export function t(key) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const intl = useIntl();

    const title = intl.formatMessage({id: key})
    return title;
}


export const validatePhoneNumber = (rule, value) => {
    const armenianPhoneRegex = /^\+374\d{8}$/;

    const russianPhoneRegex = /^\+7\d{10}$/;

    const americanPhoneRegex = /^\+1\d{10}$/;

    if (!armenianPhoneRegex.test(value) &&
        !russianPhoneRegex.test(value) &&
        !americanPhoneRegex.test(value)) {
        return Promise.reject('Խնդրում ենք մուտքագրել ճիշտ համարակալման ձևաչափին');
    }

    // If it matches, return a resolved Promise
    return Promise.resolve();
};


export const compressImage = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();

            img.src = event.target.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = 1800;
                canvas.height = (img.height / img.width) * canvas.width;

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
                    } else {
                        reject(new Error('Compression failed'));
                    }
                }, 'image/jpeg', 0.7);
            };

            img.onerror = (error) => reject(error);
        };

        reader.onerror = (error) => reject(error);
    });
};
