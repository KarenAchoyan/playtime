import 'styles/globals.css'
import {useRouter} from "next/router";
import {IntlProvider} from "react-intl";
import en from "../i18n/en.json"
import ru from "../i18n/ru.json"
import hy from "../i18n/hy.json"
import React, {useEffect, useState} from "react";
import {NavBarProvider} from "providers/NavBarContext";
import store from "../store/store";
import {CountProvider} from 'providers/countContext';
import {BasketProvider} from 'providers/BasketContext';
import {RateProvider} from "../providers/rateContext";
import {AdminProvider} from "../providers/AdminProvider";
import Login from "./login";

const messages = {
    en,
    ru,
    hy
}

function App({Component, pageProps}) {
    const router = useRouter();
    const {locale} = router;

    if (locale === undefined) {
        return <div>Loading...</div>;
    }

    function getDirection() {
        return "ltr";
    }

    const isPageInAdminFolder = router.pathname.startsWith('/admin');

    function MyComp() {
        const [isToken, setIsToken] = useState(true)
        useEffect(() => {
            const access = localStorage.getItem('access_token') || "";
            if (access !== "") {
                setIsToken(true)
            } else {
                setIsToken(false)
            }
        }, [])
        return (
            <div>
                {isToken ?
                    <Component {...pageProps} />
                    : <Login/>}
            </div>
        )
    }

    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <div>
            <span id='header'>.</span>
            <NavBarProvider>
                <CountProvider>
                    <RateProvider>
                        <BasketProvider>
                            <AdminProvider>
                                <IntlProvider locale={locale} messages={(messages)[locale]}>
                                    {isPageInAdminFolder ?
                                        <MyComp/>
                                        : (
                                            getLayout(
                                                <Component {...pageProps} />
                                            )
                                        )}
                                </IntlProvider>
                            </AdminProvider>
                        </BasketProvider>
                    </RateProvider>
                </CountProvider>
            </NavBarProvider>
        </div>
    )
}

export default store.withRedux(App);