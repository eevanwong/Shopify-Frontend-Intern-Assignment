import React from 'react';
import styles from './Item.module.css'
import img from '../../../assets/img/img.png'

export default function Item(props) {

    return (
        <div className={(props.nominated) ? styles.nominated : ''}>
            <li className={styles.item}>
                <div className={styles.text}>
                    <h3>
                        {props.children}
                    </h3>
                </div>
                <div>
                
                {props.nominated ?
                    <>
                    {(props.poster !== "N/A") ? <button disabled onClick={() => props.showImg(props)} className={styles.imgicon}><img alt='img' src={img}></img></button> : ''} 
                    <button disabled onClick={() => props.onClick(props)} className={styles.button}><img alt='button' src={props.buttonText}></img></button>
                    </>
                    : 
                    <>
                    {(props.poster !== "N/A") ? <button onClick={() => props.showImg(props)} className={styles.imgicon}><img alt='img' src={img}></img></button> : ''} 

                    <button onClick={() => props.onClick(props)} className={styles.button}><img alt='button' src={props.buttonText}></img></button>
                    </>
                }
                </div>
            </li>
        </div>
    )
}