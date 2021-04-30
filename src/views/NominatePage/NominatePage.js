import React, { useState, useEffect, useRef } from 'react';
import Baselayout from '../../components/BaseLayout/BaseLayout';
import Title from '../../components/Title/Title';
import { Box, Banner } from '../../components/Box/Box';
import Search from '../../components/BoxContent/Search/Search';
import styles from './NominatePage.module.css';
import Results from '../../components/BoxContent/Results/Results';
import Nominate from '../../components/BoxContent/Nominate/Nominate';
import { store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import Modal from 'react-modal';
import ModalContent from '../../components/ModalContent/ModalContent';

require('dotenv').config()

export default function NominatePage() { //main page, holds all state to ensure communication between child components
    const [input, setInput] = useState('');
    const [searchContent, setSearchContent] = useState(''); //searchcontent refers to the text once user clicks on search button  
    const [searchResults, setSearchResults] = useState([]);
    const [nominations, setNominations] = useState([]);
    const [prevNotification, setPrevNotification] = useState();
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState([]);

    const handleChange = (x) => { //x is input from child component
        setInput(x)
    }

    const handleSearchClick = () => {
        setSearchContent(input);
    }

    const handleSave = () => {
        store.removeNotification(prevNotification)
        setPrevNotification(store.addNotification({
            title: "Saved!",
            message: "Your nominations are saved.",
            type: "success",
            insert: "top",
            container: "top-right",
            width: 250,
            animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
            animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
            dismiss: {
                duration: 2500,
                onScreen: false
            }
        }));
        let savedNomin = {
            'nominations': nominations
        }
        localStorage.setItem("nominations", JSON.stringify(savedNomin));
    }

    const handleAdd = (nominee) => { //for search results components, clicking on button will add to nominations 
        if (nominations.length === 5) {
            store.removeNotification(prevNotification)
            setPrevNotification(store.addNotification({
                message: "You cannot have more than 5 nominations selected",
                type: "warning",
                container: "top-right",
                width: 250,
                animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
                animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
                dismiss: {
                    duration: 2500,
                    onScreen: false
                }
            }));
        } else {
            setNominations([...nominations, nominee]);
        }
    }

    const handleDelete = (nominee) => { //for nomination component, clicking on button will remove from nomination
        setNominations([...nominations].filter((nomination) => {
            return (nomination.children !== nominee.children)
        }))
    }

    const handleDeleteAll = () => {
        store.removeNotification(prevNotification)
        setPrevNotification(store.addNotification({
            message: "Your nominations are cleared.",
            type: "success",
            insert: "top",
            container: "top-right",
            width: 250,
            animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
            animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
            dismiss: {
                duration: 2500,
                onScreen: false
            }
        }));
        localStorage.clear();
        localStorage.setItem("nominations", JSON.stringify({}));
        setNominations([])
    }

    const handleShowImage = (movie) => {
        setModalInfo(movie);
        setShowModal(true);
    }

    const handleCloseImage = () => {
        setShowModal(false);
    }

    const isInitialMount = useRef(true); //used so that api does not run when page is initially loaded, also so that it searches for local storage

    useEffect(() => {
        async function fetchData() {
            if (isInitialMount.current) {
                isInitialMount.current = false;
                try {
                    setNominations((JSON.parse(localStorage.getItem('nominations')).nominations))
                } catch (err) {
                    setNominations([])
                }
            } else {
                const url = `https://www.omdbapi.com/?s=${searchContent}&apikey=${process.env.REACT_APP_API_KEY}`
                const response = await fetch(url);
                const json = await response.json();
                setSearchResults(json);
            }
        }
        fetchData();
    }, [searchContent])

    if (typeof nominations === 'undefined') {
        setNominations([])
    }

    return (
        // Entire app is encapsulated within a baselayout component, for consistent margins throughout pages
        <Baselayout>
        <Modal isOpen={showModal}
            ariaHideApp={false}
            style={{
                content: {
                  position: 'absolute',
                  maxWidth: '475px',
                  maxHeight: '500px',
                  minHeight: '350px',
                  margin: 'auto auto',
                  border: '1px solid #ccc',
                  background: '#fff',
                  overflow: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: '4px',
                  outline: 'none',
                  padding: '20px'
                }
              }}
        >
            <ModalContent movie={modalInfo} onClick={handleCloseImage}/>
        </Modal>
            <Title />
            {/*Box encapsulates all content components*/}
            <Box>
                <Search value={input} onClick={handleSearchClick} handleChange={handleChange} />
            </Box>

            <div className={styles.boxrow}>
                <Box bigger={true}>
                    <Results input={searchContent} nominees={nominations} searchResults={searchResults} onClick={handleAdd} showImg={handleShowImage}/>
                </Box>
                <div className={styles.boxcol}>
                    {(typeof nominations !== 'undefined' && nominations.length === 5) ?
                        <Banner />
                        :
                        ''
                    }
                    <Box>
                        <Nominate nominees={nominations} onClick={handleDelete} onSave={handleSave} onDeleteAll={handleDeleteAll} showImg={handleShowImage}/>
                    </Box>
                </div>
            </div>
        </Baselayout>
    )
}
