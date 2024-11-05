import React, {useEffect, useState} from 'react';
import styles from "../../styles/notification.module.css"

const Notification = ({children,style}) => {
    return (
        <div style={style} className={styles.notification}>
            {children}
        </div>
    );
};

export default Notification;