import React, {useEffect, useState} from 'react';

const Seller = ({children}) => {
    const [role, setRole] = useState(null)

    useEffect(() => {
        setRole(localStorage.getItem('role'));
    }, []);

    if(role==='1' || role==='2'){
        return (children)
    }else{
        return null
    }
};

export default Seller;