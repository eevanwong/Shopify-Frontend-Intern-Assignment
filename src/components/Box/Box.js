import React from 'react';
import styles from './Box.module.css';

export default function Box(props) { 
    return (
        <div className={(props.bigger) ? styles.box2 : styles.box}>
            {props.children}
        </div>
    )
}