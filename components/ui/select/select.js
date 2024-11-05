import React from 'react';
import styles from "../../../styles/select.module.css"
const Select = (props) => {
    return (
        <select {...props} className={styles.select}>
            {props.children}
        </select>
    );
};

export default Select;