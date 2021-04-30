import React from 'react';
import styles from './BaseLayout.module.css'
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

export default function Baselayout(props) { //Container for all content in each pg
    return (
        <>
        <ReactNotification />
        <div className={styles.margins}>
            {props.children}
        </div>
        </>
    )
}
