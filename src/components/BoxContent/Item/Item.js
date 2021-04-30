import React from 'react';
import styles from './Item.module.css'

export default function Item(props) {

    return (
        <div className={(props.nominated) ? styles.nominated : ''}>
            <li className={styles.item}>
                <div className={styles.text}>
                    <h3>
                        {props.children}
                    </h3>
                </div>
                {props.nominated ?
                    <button disabled onClick={() => props.onClick(props)} className={styles.button}><img alt='button' src={props.buttonText}></img></button>
                    : <button onClick={() => props.onClick(props)} className={styles.button}><img alt='button' src={props.buttonText}></img></button>
                }
            </li>
        </div>
    )
}