import React from 'react';
import Item from '../Item/Item';
import styles from './Results.module.css';
import Add from '../../../assets/img/plus.svg';

export default function Results(props) {
    let results = props.searchResults;

    function showResponse() {
        if (results.Error) {
            return (results.Error)
        } else {
            return ("")
        }
    }

    return (
        <>
            <div className={styles.title}>
                <h2>
                    Results for "{props.input}"
                </h2>
            </div>
            <div className={styles.results}>
                click on the img icon to view the poster
                <ul>
                <h3>{showResponse()}</h3>
                    {(results.Response !== "False" && results['Search'] !== undefined) && props.nominees !== null ?
                        <>
                        {results['Search'].map((results, i) => {
                            return (
                                <Item key={i} imdbID={results.imdbID} poster={results.Poster} showImg={props.showImg} nominated={props.nominees.some((ele) => { return ele.imdbID === results.imdbID })} buttonText={Add} onClick={props.onClick}>
                                    {`${results.Title} (${results.Year})`}
                                </Item>
                            )
                        }
                        )}
                        </> 
                        : ''
                    }
                </ul>
            </div>
        </>
    );
}
//refactor so that nominations will only have the id, and then for all items it will call the api for all of the information
