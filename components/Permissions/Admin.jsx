import React, {useEffect, useState} from 'react';

const Admin = ({children}) => {
    const [role, setRole] = useState(null)

    useEffect(() => {
        setRole(localStorage.getItem('role') || 1);
    }, []);

    if(role==='1'){
        return (children)
    }else{
        return null
    }

};

export default Admin;