import React, {useEffect} from 'react';
import Image from "next/image";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from "../../styles/brands.module.css"
import Item from "./item";
import {useDispatch, useSelector} from "react-redux";
import {getBrands} from "../../store/brand/actions";

const Brands = () => {
    const dispatch = useDispatch();
    const brands = useSelector(state => state?.brand?.brands);
    useEffect(() => {
        dispatch(getBrands.request());
    }, [dispatch]);

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: <Image width={20} height={20} alt='arrow' src={'/left-arrow.png'}/>,
        nextArrow: <Image width={20} height={20} alt='arrow' src={'/right-arrow.png'}/>,
        responsive: [
            {
                breakpoint: 1720, // screens larger than 1024px
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 1520, // screens larger than 1024px
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 1300, // screens larger than 1024px
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 900, // screens larger than 768px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 500, // screens larger than 768px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: 2,
                    prevArrow: null,
                    nextArrow: null,
                },
            }
        ],
    };
    return (
        <>
            <div className={styles.container}>
                <h1>Բաժիններ</h1>
                <Slider {...settings}>
                    {brands?.map((item)=>(
                        <Item key={item.id} item={item}/>
                    ))}
                </Slider>
            </div>
        </>

    );
};

export default Brands;