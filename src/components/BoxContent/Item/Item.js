import React, { useState } from 'react';
import styles from './Item.module.css'

export default function Item(props) {
    // const [nominated, setNominated] = useState(false);

    return (
        <div className={(props.nominated) ? styles.nominated : ''}>
            <li className={styles.item}>
                <div className={styles.text}>
                    <h3>
                        {props.children}
                    </h3>
                </div>
                {props.nominated ?
                    <button disabled onClick={() => props.onClick(props)} className={styles.button}><img src={props.buttonText}></img></button>
                    : <button onClick={() => props.onClick(props)} className={styles.button}><img src={props.buttonText}></img></button>
                }
            </li>
        </div>
    )
}