import {useRef} from 'react';
import DefaultImage from '../../src/images/DefaultBook.jpg';
import React from 'react';
import Popup from 'reactjs-popup';
import './Book.css';
import CheckoutServices from '../services/Checkout.services';
import LoginPage from '../pages/login';
import {  Link, Navigate, redirect, replace, Route, useNavigate } from 'react-router-dom';

function Book (props) {
    const IsAuth = sessionStorage.getItem('AuthToken');    
    
    const imgRef = useRef();
    
    function onImageError() {
        imgRef.current.src = DefaultImage;
    }

    function Checkout() {
        const bookInfo = {
            Author: props.Author,
            Description: props.Description,
            Genre: props.Genre,
            Image: props.Image,
            Title: props.Title
        }

        CheckoutServices.checkoutBook(props.Title, bookInfo);
        console.log("Book added")
        alert("Book checked out")
    }

    

    function LoginRedirect() {
        console.log("redirect")
        window.location.replace("../login")
    }

    return (
        <div className="thumbnail">
            <Popup trigger={
                <button className='bookBtn'>
                    <img
                        className='bookImg'
                        ref={imgRef}
                        onError={onImageError}
                        src={`data:image/png;base64,${props.Image}`} 
                        alt={`book of ${props.Title}`}
                        style={{width: 140, height: "auto"}}
                    />
                    <span className='hoverText'><h1>{props.Author}</h1><h2>{props.Genre}</h2></span>
                    <p className='booktitle'>{props.Title}</p>
                </button> 
            } position="center center">
                <div id="bookPopup">
                        <div className='popupheader'>
                        <div className='bookinfo'>
                        <h1>{props.Title}</h1>
                        <h2>Author: {props.Author}</h2>
                        <h3>Genre: {props.Genre}</h3>
                        </div>
                        { ((IsAuth === null) || (window.location.pathname ==='/checkout') ) ? <button onClick={() => { LoginRedirect() }} className='addtocart'>Login to Checkout</button> : <button onClick={() => { Checkout() }} className='addtocart'>Checkout</button> }
                        </div>
                        <p>
                        {props.Description}<br></br>
                        {props.id}<br></br>
                        </p>
                </div>
            </Popup>
        </div>
    );
}

export default Book;