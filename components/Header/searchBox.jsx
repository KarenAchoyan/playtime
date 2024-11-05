import React, {useEffect, useState} from 'react';
import styles from "../../styles/header.module.css";
import Item from "../Products/Item";
import {useDispatch, useSelector} from "react-redux";
import {searchProducts} from "../../store/products/actions";
import {Input, Form, Button} from "antd";
import {t} from "../../utils/utils";
import {useRouter} from "next/router";
import ItemSearch from "./ItemSearch";

const SearchBox = ({onClose}) => {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');
    const filteredSearch = useSelector((state) => state?.product?.searchResult?.data);
    const [searchTimeout, setSearchTimeout] = useState(null);


    useEffect(() => {
        if (searchTerm !== '') {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            const timeoutId = setTimeout(() => {
                dispatch(searchProducts.request({query: searchTerm}));
            }, 500);
            setSearchTimeout(timeoutId);
        }
    }, [dispatch, searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <div className={styles.boxSearch}>
                <div className={styles.containerSearch}>
                    <Form.Item
                        name="search"
                        className={styles.searchBoxItem}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a search term!',
                                min: 3,
                            },
                        ]}
                        validateTrigger="onChange"
                    >
                        <div className={styles.row}>
                            <Input
                                onChange={handleSearchChange}
                                placeholder={t("search")}
                            />
                            <Button type="primary">{t('search')}</Button>
                            {searchTerm.length > 1 &&
                                <div style={{
                                    maxHeight: filteredSearch?.length > 0 ? "550px" : "auto",
                                    overflowY: filteredSearch?.length > 0 ? "scroll" : "auto",
                                }} className={styles.searchResult}>
                                    {filteredSearch?.length > 0 ? filteredSearch?.map((item) => (
                                        <ItemSearch key={item.id} item={item}/>
                                    )) : searchTerm.length > 0 ?
                                        <h4 style={{textAlign: 'center', width: '100%'}}>{t("result_none")}</h4> : null}
                                </div>
                            }
                        </div>
                    </Form.Item>


                </div>
            </div>
            {/*<div onClick={onClose} className={styles.searchBoxBack}/>*/}
        </div>
    );
};

export default SearchBox;