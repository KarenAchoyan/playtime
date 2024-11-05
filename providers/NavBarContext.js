import React, { createContext, useState } from 'react';

const NavbarContext = createContext();

export const NavBarProvider = ({ children }) => {
    const [subMenu, setSubMenu] = useState("");


    return (
        <NavbarContext.Provider value={{ subMenu,setSubMenu }}>
            {children}
        </NavbarContext.Provider>
    )
}

export default NavbarContext;