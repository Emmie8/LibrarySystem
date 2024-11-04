import { useEffect, useState } from "react";
import Book from "../components/Book";
import './checkout.css';
import CheckoutServices from "../services/Checkout.services";

function Checkout() {
    const [checkout, setCheckout] = useState([]);

    useEffect(() => {
        getCheckout();  
    },[]);

    async function getCheckout() {
        const checkoutData = await CheckoutServices.getCheckoutBooks();
        setCheckout(checkoutData.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    return[
        <div className="cartcontainer">
            <h2 className="section-header">My Books</h2>
            <div className="cart-row">
                {
                checkout.map((book, index) => {
                    return (
                    <>

                        <Book
                            key={book.id}
                            Title={book.Title}
                            Image={book.Image}
                            Description={book.Description}
                            Author={book.Author}
                            Genre={book.Genre} 
                        />
                       
                    </>
                    );
                })
                }
            </div>
        </div>
    ];
}

export default Checkout;