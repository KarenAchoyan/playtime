import React from 'react';
import styles from "../../../styles/button.module.css"
const Button = (props) => {
    return (
        <button {...props} className={styles.button}>{props.children}</button>
    );
};

export default Button;