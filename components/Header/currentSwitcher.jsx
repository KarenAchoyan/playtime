import React, {useContext, useEffect, useState} from 'react';
import styles from "../../styles/header.module.css";
import CurrentValue from "./currentValue";
import RateContext from "../../providers/rateContext";


const CurrentSwitcher = ({setIsOpenDrb,openDrb, setIsOpenDrbFlag}) => {
    const {change,currentRate,rate} = useContext(RateContext)

    function openDrbs() {
        setIsOpenDrb(!openDrb)
        setIsOpenDrbFlag(false)
    }

    const CurrentValue = () => {
        const [allNotSelected, setAllNotSelected]=useState([]);

        useEffect(()=>{
            setAllNotSelected(rate.filter(x=>x.current!==currentRate?.current));
        },[currentRate])

        function changeRate(rate) {
            change(rate)
        }

        return (
            <div className={styles.priceDrbContent}>
                {allNotSelected.map((item)=> (
                    <p onClick={() => changeRate(item)} key={item.id}>{item.current}</p>
                ))}
            </div>
        );
    };
    return (
        <li className={styles.language}>
            <span className={styles.currentcySize} onClick={openDrbs}>
                {currentRate?.current}
                 <div className={styles.priceDrb}>
                     {openDrb ? <CurrentValue/> : null}
                 </div>
            </span>
        </li>
    );
};

export default CurrentSwitcher;