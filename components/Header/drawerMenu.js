import React, { useState } from 'react';
import { Drawer } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/drawermenu.module.css';
import headerStyle from '../../styles/footer.module.css';
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";

const DrawerMenu = ({ categories, locale }) => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(!visible);
    };

    const onClose = () => {
        setVisible(false);
    };

    const router = useRouter();

    return (
        <div>
            <div
                className={`${styles.drawerStyle} ${visible? styles.active : null}`}
            >
                <div className={styles.drawerContent}>
                    <div
                        onClick={showDrawer}
                        style={{borderColor:visible? "white" : "black"}}
                        className={`${styles.drawerButton} ${visible ? styles.opened : ''}`}
                    >
                        <span>Categories</span>
                    </div>
                    <div className={headerStyle.socials}>
                        <div className={headerStyle.itemSocial}>
                            <a href="https://www.instagram.com/poel.am/" target="_blank" rel="noopener noreferrer">
                                <InstagramOutlined/>
                            </a>
                        </div>
                        <div className={headerStyle.itemSocial}>
                            <a target="_blank" rel="noopener noreferrer"
                               href="https://www.facebook.com/profile.php?id=100064626914118&mibextid=LQQJ4d">
                                <FacebookOutlined/>
                            </a>
                        </div>
                    </div>
                    <ul className={styles.headerMenu}>
                        {categories.map((item) => {
                            const {name, name_ru, id} = item;
                            const isActive = Number(router.query.category) === id;
                            const title = locale === 'ru' ? name_ru : name;

                            return (
                                <li key={id} className={isActive ? styles.activeCategory : ''}>
                                    <Link href={`/products/${id}`}>
                                        {title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            {visible ? <div className={styles.closeMenu} onClick={onClose}/> : null}
        </div>
    );
};

export default DrawerMenu;
