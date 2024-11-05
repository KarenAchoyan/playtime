import React, {createContext, useState} from "react";

const CountContext = createContext(null);

export const CountProvider = ({children}) => {
    const [basketCount, setBasketCount] = useState(0);

    const updateBasketCount = (count) => {
        setBasketCount(count);
    };

    return (
        <CountContext.Provider value={{ basketCount, updateBasketCount }}>
            {children}
        </CountContext.Provider>
    );
}

export default CountContext