import React, {useEffect, useState, useContext} from 'react';
import styles from "../../styles/header.module.css"
import {
    CloseOutlined,
    HeartOutlined, MenuOutlined,
    SearchOutlined, ShoppingOutlined
} from '@ant-design/icons';
import Link from "next/link";
import SearchBox from "./searchBox";
import LanguageSwitcher from "./languageSwitcher";
import MobileMenu from "./mobileMenu";
import {useRouter} from "next/router";
import CountContext from 'providers/countContext';
import CurrentSwitcher from "./currentSwitcher";
import {Button, Drawer, Image} from "antd";
import DrawerMenu from "./drawerMenu";

const Header = ({categories}) => {
    const [isSearchBox, setIsSearchBox] = useState(false)
    const [isMenu, setIsMenu] = useState(false)
    const {count, setCount} = useContext(CountContext)
    const router = useRouter();
    const {locale} = router;
    const [isOpenDrb, setIsOpenDrb] = useState(false)
    const [isOpenDrbFlag, setIsOpenDrbFlag] = useState(false)
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        console.log(categories)
    }, [categories])

    useEffect(() => {
        const handleRouteChange = () => {
            setIsSearchBox(false);
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    useEffect(() => {
        const basket = +localStorage.getItem('basketCount');
        const favorite = +localStorage.getItem('favoriteCount');
        setCount(() => {
            return {
                favorite,
                basket
            };
        })
    }, [setCount])

    function openSearchBox() {
        setIsSearchBox(!isSearchBox)
    }

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    function handlerMenu() {
        setIsMenu(!isMenu)
    }

    function handleClose() {
        setIsMenu(false)
    }

    return (
        <div>
            <header className={styles.header}>
                <link rel="icon" type="image/png" href="/2.png"/>
                <div className={styles.contentHeader}>
                    <div className={styles.rowLogo}>
                        <div className={styles.logo}>
                            <Link href={'/home'}>
                                <Image preview={false} src="/2.png" alt=""/>
                            </Link>
                        </div>
                        <DrawerMenu categories={categories}/>
                    </div>
                    <div className={styles.mobileMenu}>
                       <span className={styles.btnMenu} onClick={handlerMenu}>
                           <MenuOutlined/>
                       </span>
                        <div className={`${styles.menuStyle} ${isMenu ? styles.active : null}`}>
                            <MobileMenu handlerClosing={handleClose} handlerClose={handlerMenu}/>
                        </div>
                    </div>
                    <div>
                        <SearchBox onClose={openSearchBox}/>
                    </div>
                    <div>
                        <div className={styles.icons}>
                            <ul>
                                <li>
                                    <span className={styles.countBasket}>{count.basket}</span>
                                    <Link href={'/basket'}> <ShoppingOutlined/></Link>
                                </li>
                                <li>
                                    <span className={styles.countBasket}>{count.favorite}</span>
                                    <Link href={'/favorite'}><HeartOutlined/></Link>
                                </li>

                                <CurrentSwitcher openDrb={isOpenDrb} isOpenDrbFlag={isOpenDrbFlag}
                                                 setIsOpenDrb={setIsOpenDrb} setIsOpenDrbFlag={setIsOpenDrbFlag}/>
                                <LanguageSwitcher openDrb={isOpenDrb} isOpenDrbFlag={isOpenDrbFlag}
                                                  setIsOpenDrb={setIsOpenDrb} setIsOpenDrbFlag={setIsOpenDrbFlag}/>

                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;