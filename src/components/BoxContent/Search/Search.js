import React from 'react';
import styles from './Search.module.css';
import searchImg from '../../../assets/img/search.png';

export default function Search(props) {
    return (
        <>
            <h3 className={styles.title}>Movie title</h3>
            <div className={styles.searchbar}>
                <img className={styles.searchimg} alt='search' src={searchImg}/>
                <div className={styles.form}>
                    <input className={styles.input} type='text' autoComplete='off' id='input' name='input' value={props.value} onChange={(e) => props.handleChange(e.target.value)}/>
                </div>
            </div>
            <div className={styles.searchbutton}>
                <button onClick={() => props.onClick()} className={styles.button}>
                    <h2>search</h2>
                </button>
            </div>
        </>
    )
}