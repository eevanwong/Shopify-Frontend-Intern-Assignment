import React from 'react';
import styles from './ModalContent.module.css';
import exitimg from '../../assets/img/x.png'

export default function ModalContent(props) {
    console.log(props)
    return(
        <div className={styles.content}>
            <div className={styles.topsection}>
            <h2>Poster of {props.movie.children}</h2>
                <button onClick={() => props.onClick()}><img src={exitimg} alt='exit'/></button>
            </div>
            <div className={styles.body}>
                <img alt='poster' src={props.movie.poster}></img>
            </div>

        </div>
    )
}