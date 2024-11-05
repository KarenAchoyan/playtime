import {createContext, useEffect, useState} from "react";

const AdminContext = createContext();

export const AdminProvider = ({children}) => {
    const [auth,setAuth] = useState({});

    useEffect(() => {

    }, []);

    function setAuths(user){
        localStorage.setItem('role',user.role_id);
    }


    return(
        <AdminContext.Provider value={{auth,setAuth}}>
            {children}
        </AdminContext.Provider>
    )
}


export default AdminContext