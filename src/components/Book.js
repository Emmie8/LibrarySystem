import {useRef} from 'react';
import DefaultImage from '../../src/images/DefaultBook.jpg';
import React from 'react';
import Popup from 'reactjs-popup';
import './Book.css';
import CheckoutServices from '../services/Checkout.services';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



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
        // console.log("Book added")
        toast.success("Book Checked Out")
    }

    function LoginRedirect() {
        console.log("redirect")
        window.location.replace("../login")
    }


    function ReturnBook(bookTitle) {
        toast.success("Book Returned")
        CheckoutServices.returnBook(bookTitle)
        // console.log("Book Returned")
        setTimeout(function(){
            window.location.reload();
         }, 5000);
    }

    function cleanedTitle(bookTitle) {
        var cleanString
        cleanString = bookTitle.trim()
        if (cleanString.length > 30) {
            cleanString = cleanString.slice(0,30)
            cleanString = cleanString.slice(0,cleanString.lastIndexOf(' '))
        } else {
            cleanString = cleanString.slice(0,30)
        }
        return(
            cleanString
        )
    }

    return (
        <div id='bookThumbnail' className="thumbnail">
            <Popup trigger={
                // thumbnail
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
                    <p className='booktitle'>{cleanedTitle(props.Title)}</p>
                </button> 
            } position="center center">
                <div id="bookPopup">
                        <div className='popupheader'>
                        <div className='bookinfo'>
                        <h1>{props.Title}</h1>
                        <h2>Author: {props.Author}</h2>
                        <h3>Genre: {props.Genre}</h3>
                        </div>
                        { 
                        ((IsAuth === null)) ? <button onClick={() => { LoginRedirect() }} className='addtocart'>Login to Checkout</button> : 
                        (window.location.pathname ==='/checkout') ? <button onClick={() => {ReturnBook(props.Title)}} className='addtocart'>Return Book</button> : 
                        <button onClick={() => { Checkout() }} className='addtocart'>Checkout Book</button> }
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