import React, {useContext, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Success from "./success";
import Failed from "./failed";
import {Skeleton} from "antd";
import BasketContext from "../../providers/BasketContext";
import CountContext from "../../providers/countContext";

const ReturnUrl = () => {
    const router = useRouter();
    const [paymentState, setPaymentState] = useState(null)
    const {remove} = useContext(BasketContext);
    const {setCount} = useContext(CountContext)

    useEffect(()=>{
        const baskets = JSON.parse(localStorage.getItem('basket')) || [];
        const favorite = JSON.parse(localStorage.getItem('favorite')) || [];
        setCount({basket:baskets.length, favorite:favorite.length})
    },[setCount])

    useEffect(() => {
        const {orderId} = router.query;

        const fetchPaymentStatus = async () => {
            try {
                const response = await fetch(process.env.API_URL+'/payment/check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({orderId})
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    if (data.actionCodeDescription !== "Request processed successfully") {
                        setPaymentState(false)

                    } else {
                        setPaymentState(true)
                        const baskets = JSON.parse(localStorage.getItem('basket'));
                        setCount({basket:0, favorite:0})
                        baskets.forEach(function(item){
                            remove(item)
                        })
                    }
                } else {
                    console.error('Failed to fetch payment status');
                }
            } catch (error) {
                console.error('Error fetching payment status:', error);
            }
        };

        fetchPaymentStatus();
    }, [router.query]);


    return (
        <div>
            {paymentState === true ? <Success/> : (paymentState === false) ? <Failed/> : null}
        </div>
    );
};

export default ReturnUrl;