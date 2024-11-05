import React, {useEffect} from 'react';
import styles from "../../styles/blog.module.css";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {getBlog} from "../../store/blog/actions";
import App from "../../components/Layouts/app";
import Image from "next/image";
import {Carousel} from "antd";

const Id = () => {
    const router = useRouter();
    const {id} = router.query;
    const dispatch = useDispatch()
    const item = useSelector(state => state?.blog?.selectedBlog?.data) || {};

    useEffect(() => {
        dispatch(getBlog.request({id}))
    }, [dispatch, id]);


    const {locale} = router;


    function ImageComponent({image}){
        if(image?.image[0]==='u'){
            return (<img src={process.env.IMAGE_URL2  + image.image}  alt="Blog image"/>)

        }else{
            return (<img src={process.env.IMAGE_URL + image.image} alt="Blog image"/>)
        }
    }

    return (
        <div>
            <App>
                <div>
                    <div key={item.id} className={styles.blogSingle}>
                        <div className={styles.blogRow}>
                            <div className={styles.item}>
                                <div className={styles.picture}>
                                    <Carousel autoplay>
                                        {item?.images?.map((image) =>(
                                            <ImageComponent key={item.id} image={image}/>
                                        ))}
                                    </Carousel>
                                </div>
                                <div className={styles.text}>
                                    <span>{(locale === 'en') ? item.title_en : (locale === 'ru') ? item.title_ru : item.title}</span>
                                    <p dangerouslySetInnerHTML={{__html: (locale === 'en') ? item.content_en : (locale === 'ru') ? item.content_ru : item.content }}></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </App>
        </div>
    );
};

export default Id;