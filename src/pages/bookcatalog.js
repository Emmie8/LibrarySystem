import { useEffect, useState } from "react";
import Book from "../components/Book";
import BookCrudServices from "../services/Book.crud.services";
import "./bookcatalog.css";

var masterBooks = new Map();

function Bookcatalog() {
  const [books, setBooks] = useState([]);
  const [sortOption, setSortOption] = useState([]);

  useEffect(() => {
    populateBooks();  
  },[]);

  async function getBooks() {
    const booksData = await BookCrudServices.getAllBooks();
    var booksMap = booksData.docs.map((doc) => ({...doc.data(), id: doc.id}))
    setBooks(booksMap)
    setSortOption("isbn")
    return booksMap
  }

  async function populateBooks() {
    const result = await getBooks();
    masterBooks = result
  }

  function sortAscending() {
    const ascending = [...books].sort((a,b) => {
      return a.Title > b.Title ? 1 : -1
    })
    setBooks(ascending)
    setSortOption("ascending");
  }

  function sortDescending() {
    const descending = [...books].sort((a,b) => {
      return a.Title < b.Title ? 1 : -1
    })
    setBooks(descending)
    setSortOption("descending");
  }

  function sortAuthor() {
    const author = [...books].sort((a,b) => {
      return a.Author > b.Author ? 1 : -1
    })
    setBooks(author)
    setSortOption("author");
  }

  function sortGenre() {
    const genre = [...books].sort((a,b) => {
      return a.Genre > b.Genre ? 1 : -1
    })
    setBooks(genre)
    setSortOption("genre");
  }

  function sortISBN() {
    const isbn = [...books].sort((a,b) => {
      return a.id > b.id ? 1 : -1
    })
    setBooks(isbn)
    setSortOption("isbn");
  }

  function searchBooks(){
    var input, searchVal
    input = document.getElementById("searchBox")
    
    searchVal = input.value.toLowerCase()
    // console.log(searchVal)
    var search = [];
    // console.log(masterBooks)
    for (const [ value] of masterBooks.entries()) {
      if (value.Title.toLowerCase().includes(searchVal)){
        search.push(value)
      }
      else if (value.Author.toLowerCase().includes(searchVal)){
        search.push(value)
      }
    }
    setBooks(search)
    setSortOption("search")
  }

  function genreList(){
    var genres = [];
    const bookList  = [...books];
    // console.log(bookList)
    bookList.forEach((book) => {
      // console.log(book.Genre)
      if (!genres.includes(book.Genre)){
        genres.push(book.Genre)
      }
    })
    // console.log(genres)
    return genres
  }

  function eachGenreArray(genre){
    var genreBookList = [];
    const bookList = [...books];
    bookList.forEach((book) => {
      if (book.Genre === genre){
        genreBookList.push(book)
      }
    })
    return genreBookList
  }




  return (
    <div className="catalog">
      <div className="sortbtncontainer">
        <button onClick={() => { sortAscending() }} className="sortBtn Ascending">Ascending</button>
        <button onClick={() => { sortDescending() }} className="sortBtn Descending">Descending</button>
        <button onClick={() => { sortAuthor() }} className="sortBtn Author">Author</button>
        <button onClick={() => { sortGenre() }} className="sortBtn Genre">Genre</button>
        <button onClick={() => { sortISBN() }} className="sortBtn ISBN">ISBN</button>
        <input id="searchBox" type="text" onKeyUp={() => {searchBooks()}} placeholder="Search"/>
      </div>
      {/* <div id="rowHeaders">
        { ((sortOption === "genre") || (sortOption === "author")) ? <h1>Books by Genre</h1> : <></> }

      </div> */}
      <div id="bookCatalogRow">
        {
         ( 
            books.map((book, index) => {
              return (
                <Book
                  key={book.id}
                  Title={book.Title}
                  Image={book.Image}
                  Description={book.Description}
                  Author={book.Author}
                  Genre={book.Genre}
                />
              );
            })
          )
        }
      </div>
    </div>
  )
}

export default Bookcatalog;