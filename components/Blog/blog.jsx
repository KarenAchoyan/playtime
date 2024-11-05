import React, {useEffect} from 'react';
import styles from "../../styles/blog.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getBlogs} from "../../store/blog/actions";
import {isTruncContent, t, truncateContent} from "../../utils/utils";
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";
import { Carousel } from 'antd';

const Blog = () => {
    const blogs = useSelector((state) => state.blog.blogs);
    const dispatch = useDispatch();
    const router = useRouter()
    const {locale} = router;

    useEffect(() => {
        dispatch(getBlogs.request());
    }, [dispatch]);

    function ImageComponent({item}){
        if(item?.image[0]==='u'){
            return (<img src={process.env.IMAGE_URL2  + item.image}  alt="Blog image"/>)

        }else{
            return (<img src={process.env.IMAGE_URL  + item.image} alt="Blog image"/>)
        }
    }
    return (
        <div>
            {blogs.map((item, index) => (
                <div key={item.id} className={styles.blog}>
                    <div className={index % 2 === 0 ? styles.blogRow : styles.blogRowNorm}>
                        <div className={styles.item}>
                            <div className={styles.picture}>
                                <Carousel autoplay>
                                    {item.images.map((item) =>(
                                        <ImageComponent key={item.id} item={item}/>
                                    ))}
                                </Carousel>
                            </div>
                            <div className={styles.text}>
                                <span>{(locale === 'en') ? item.title_en : (locale === 'ru') ? item.title_ru : item.title}</span>
                                <p dangerouslySetInnerHTML={{__html: truncateContent((locale === 'en') ? item.content_en : (locale === 'ru') ? item.content_ru : item.content, 550)}}></p>
                                {isTruncContent((locale === 'en') ? item.content_en : (locale === 'ru') ? item.content_ru : item.content, 550) ?
                                    <Link href={`blog/${item.id}`}>{t("know_more")}</Link>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default Blog;