import React, {createContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getRate} from "../store/rate/actions";

const RateContext = createContext();

export const RateProvider = ({children}) => {
    const [currentRate, setCurrentRate] = useState({current: "AMD", value: "1"})
    const rate = useSelector((state) => state?.rate?.rate?.data) || [];
    const dispatch = useDispatch();
    const rates = [
        {id:1, current:"USD"},
        {id:2, current:"RUB"},
        {id:3, current:"AMD"}
    ]
    useEffect(() => {
        dispatch(getRate.request())
    }, [dispatch]);

    useEffect(() => {
        setCurrentRate(JSON.parse(localStorage.getItem('currentRate')) || {current: "AMD", value: "1"})
    }, []);


    useEffect(() => {
        localStorage.setItem('currentRate', JSON.stringify(currentRate))
    }, [currentRate]);


    function change(item) {
        setCurrentRate(rate.find(x => x.current === item.current));
    }

    function price(p) {
        if (currentRate?.current === 'AMD') {
            return p;
        } else {
            const r = p / currentRate?.value;
            return r.toFixed(1);
        }
    }

    return (
        <RateContext.Provider value={{change, currentRate, rate, price,rates}}>
            {children}
        </RateContext.Provider>
    )
}

export default RateContext;