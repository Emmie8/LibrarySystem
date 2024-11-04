import {db} from '../FirebaseConfig';
import { 
    collection, 
    doc,
    getDocs, 
    setDoc,
    deleteDoc  
} from 'firebase/firestore';

const uid = sessionStorage.getItem('userUID');
const bookCollectionPath = "CheckoutLogs/" + uid + "/BookList";
const bookListCollectionRef = collection(db, bookCollectionPath);
const CheckoutCollectionRef = collection(db, "CheckoutLogs");

class CheckoutDataService {
    addUserLog = (newUserLog) => { 
        return setDoc(CheckoutCollectionRef, newUserLog);
    }
    getCheckoutBooks = () => {
        return getDocs(bookListCollectionRef);
    }
    returnBook = (bookTitle) => {
        const book = doc(db, bookCollectionPath, bookTitle);
        return deleteDoc(book);
    }
    checkoutBook = (bookTitle, bookInfo) => {
        return setDoc(doc(bookListCollectionRef, bookTitle), bookInfo);
    }
}

export default new CheckoutDataService();
