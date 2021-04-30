import React from 'react';
import styles from './Title.module.css'

export default function Title(props) {
    return(
        <div className={styles.title}>
            <h1>
                The <span>Shoppies</span>
            </h1>
        </div>
    )
}