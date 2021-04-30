import React from 'react';
import styles from './Box.module.css';

export function Box(props) { 
    return (
        <div className={(props.bigger) ? styles.box2 : styles.box}>
            {props.children}
        </div>
    )
}

export function Banner() {
    return (
        <div className={styles.banner}>
            <h2>You have successfully picked 5 of your nominations</h2>
        </div>
    )
}