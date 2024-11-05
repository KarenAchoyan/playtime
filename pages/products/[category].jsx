import React, {useContext, useEffect, useMemo, useState} from 'react';
import styles from '../../styles/category.module.css';
import {CheckOutlined, FilterOutlined} from '@ant-design/icons';
import Notification from '../../components/notification/notification';
import {t} from '../../utils/utils';
import Input from '../../components/ui/input/input';
import {useDispatch, useSelector} from 'react-redux';
import {getSubCategories} from 'store/category/actions';
import {filterProducts, getProductsCategories} from 'store/products/actions';
import {Button, Checkbox, Form, Skeleton} from 'antd';
import Item from "../../components/Products/Item";
import App from '../../components/Layouts/app';
import {useRouter} from 'next/router';
import RateContext from "../../providers/rateContext";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

const Index = () => {
    const categories = useSelector((state) => state.category?.subCategories?.data) || [];
    const products = useSelector((state) => state.product.products) || [];
    const isFetching = useSelector((state) => state.product.isFetching);
    const dispatch = useDispatch();
    const [isNav, setIsNav] = useState(typeof window !== 'undefined' && window.innerWidth >= 900);
    const [isShow, setIsShow] = useState(false);
    const [form] = Form.useForm();
    const router = useRouter();
    const {category} = router.query;
    const {currentRate} = useContext(RateContext)
    const [ids, setIDs ] = useState([])
    const {locale} = router;
    const stylesNotification = {
        transform: isShow ? 'translate(0%)' : 'translate(150%)',
    };

    useEffect(() => {
        setTimeout(() => {
            const {min, max, ids} = router.query;
            if (min !== undefined && max !== undefined && ids !== undefined) {
                form.setFieldsValue({
                    start: min || 0,
                    end: max || 0,
                });
            }
        }, 1000);
    }, [router.query, form]);


    function addNotification() {
        setIsShow(true);
        setTimeout(() => {
            setIsShow(false);
        }, 2000);
    }

    useEffect(() => {
        form.resetFields()
        dispatch(getSubCategories.request({id: category}));
        dispatch(getProductsCategories.request({id: category}));
    }, [form, category, dispatch]);


    useEffect(() => {
        const updateIsNav = () => {
            setIsNav(window.innerWidth >= 900);
        };
        window.addEventListener('resize', updateIsNav);

        return () => {
            window.removeEventListener('resize', updateIsNav);
        };
    }, []);


    function setUrl(start, end, categories, id) {
        const query = {
            min: start || 0,
            max: end || 1000000,
            ids: categories,
        };

        const updatedQuery = {
            ...query,
        };

        router.push({
            pathname: '/products/' + id,
            query: updatedQuery,
        });
    }


    const handleSubmit = (values) => {
        const jsonCategories = JSON.stringify(ids);
        const query = {
            min: (values.start * currentRate.value) || 0,
            max: (values.end * currentRate.value) || 10000000,
            categories: jsonCategories,
            id: category
        };
        dispatch(filterProducts.request(query))
        setUrl(values.start, values.end, jsonCategories, category)
    };

    function clearFilter() {
        router.push({
            pathname: '/products/' + category,
        });
        dispatch(getProductsCategories.request({id: category}));

        form.resetFields()

    }

    function changes(id, e) {
        if (e.target.checked) {
            setIDs(
                [
                    ...ids,
                    id
                ]
            )
        }else{
            setIDs(ids.filter(x=>x!==id));
        }
    }
    function openNav(){
        setIsNav(true)
    }


    function Nav() {
        return (
            <div className={`${styles.nav} ${isNav===true ? styles.active : null}`}>
                <div className={styles.headerNav}>
                    <span onClick={()=>setIsNav(false)}>
                        <CloseIcon/>
                    </span>
                </div>
                <Form onFinish={handleSubmit} form={form}>
                    <ul className={styles.filterList}>
                        {categories.map((item) => {
                            const name =  (locale === 'ru') ? item.name_ru : item.name


                            return (
                                <li key={item.id}>
                                    <span>{name}</span>
                                    <span>
                                  <Form.Item name={['checkboxs', item.id]} valuePropName="checked">
                                    <Checkbox onChange={(e) => changes(item.id, e)}/>
                                  </Form.Item>
                                </span>
                                </li>
                            )
                        })}
                    </ul>
                    <div className={styles.filterList}>
                        <h3>{t('price')}</h3>
                        <div className={styles.priceList}>
                            <Form.Item name={'start'}>
                                <Input placeholder={'Սկսած'} name={'startPrice'} defaultValue={0} type="number"/>
                            </Form.Item>
                            <Form.Item name={'end'}>
                                <Input defaultValue={0} placeholder={'Մինչև'} min={0} name={'endPrice'} type="number"/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className={styles.lastSection}>
                        <Button htmlType={'submit'}>{t('filter')}</Button>
                        <Button onClick={clearFilter}>{t('clear')}</Button>
                    </div>
                </Form>
            </div>
        )
            ;
    }

    return (
        <Skeleton loading={isFetching} active>
            <div className={styles.mobileContainer}>
               <span className={styles.filterButton} onClick={openNav}>
                    <FilterOutlined />
               </span>
            </div>
            <div className={styles.row}  style={{marginTop:"90px"}}>
                <Nav/>

                <div className={styles.productsSection}>
                    <div className={styles.productRow}>
                        {products.length > 0 ? products.map((item) => (
                            <Item addCart={addNotification} key={item.id} item={item}/>
                        )) : (
                            <h2 className={styles.title}>{t("product_not_found")}</h2>
                        )}
                    </div>
                </div>
            </div>
            <Notification style={stylesNotification}>
          <span className="icon">
            <CheckOutlined/>
          </span>
                <span>{t("added_basket")}</span>
            </Notification>
        </Skeleton>
    );
};

Index.getLayout = function getLayout(page) {
    return (
        <App>
            <div>
                {page}
            </div>
        </App>
    )
}

export default Index;

