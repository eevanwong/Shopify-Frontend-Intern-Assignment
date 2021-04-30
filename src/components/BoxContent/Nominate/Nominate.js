import React from 'react';
import styles from './Nominate.module.css';
import Item from '../Item/Item';
import Minus from '../../../assets/img/minus.png'

export default function Nominate(props) {

    return (
        <>
            <div className={styles.title}>
                <h2>
                    Nominations
                </h2>
            </div>
            <div className={styles.results}>
                <ul>
                    {(props.nominees.length !== 0) ? 
                    <>
                    {props.nominees.map((movie, i) => {
                        return (<Item key={i} onClick={props.onClick} buttonText={Minus}>{(movie.children)}</Item>)
                    })
                    }

                    </>
                    :'' }
                    <div className={styles.buttons}>
                        <button onClick={props.onDeleteAll}className={styles.clear}><h2>clear</h2></button>
                        <button onClick={props.onSave} className={styles.save}><h2>save</h2></button>
                    </div>
                </ul>
            </div>
        </>
    );
}
