import React, {useEffect} from 'react';
import Header from "../Header/header";
import Footer from "../Footer/footer";
import {Loader} from "../../utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../../store/category/actions";
import {getContact} from "../../store/about/actions";

const App = ({children}) => {
    const categories = useSelector((state) => state.category?.categories) || [];
    const contact = useSelector((state) => state.contact.contact) || {};
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories.request());
        dispatch(getContact.request())
    }, [dispatch])

    return (
        <div>
                <Header categories={categories}/>
                <div style={{marginTop:'37px'}}>
                    {children}
                    <Loader/>
                </div>
                <Footer contact={contact} categories={categories}/>
        </div>
    );
};

export default App;