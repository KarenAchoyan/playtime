import React, { createContext, useEffect, useState } from 'react';
import {useRouter} from "next/router";

const CountContext = createContext();

export const CountProvider = ({ children }) => {
    const [count, setCount] = useState({favorite:0, basket:0});
    useEffect(()=>{
        const baskets = JSON.parse(localStorage.getItem("basket")) || []
        const favorites = JSON.parse(localStorage.getItem("favorites")) || []
        localStorage.setItem('basketCount', baskets.length)
        localStorage.setItem('favoriteCount', favorites.length)
    },[count])


    
    
    return (
        <CountContext.Provider value={{ count, setCount }}>
            {children}
        </CountContext.Provider>
    )
}

export default CountContext;