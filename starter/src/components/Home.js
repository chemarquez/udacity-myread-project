import "../App.css";
import { useState, useEffect, useMemo } from "react";
import * as BooksAPI from "../BooksAPI";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

const Home = () => {
    const [booksList, setBooksList] = useState([]);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const response = await BooksAPI.getAll();
                setBooksList(response);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        loadBooks();
    }, []);

    // By using usemMemo hook ensures that the filtering is only performed when the books array changes, not on every render
    const currentlyReadingBooks = useMemo(
        () => booksList.filter((book) => book.shelf === "currentlyReading"),
        [booksList]
    );
    const wantToReadBooks = useMemo(() => booksList.filter((book) => book.shelf === "wantToRead"), [booksList]);
    const readBooks = useMemo(() => booksList.filter((book) => book.shelf === "read"), [booksList]);

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <BookShelf
                    key={"currentlyReading"}
                    booksList={currentlyReadingBooks}
                    title={"Currently Reading"}
                    onUpdateBookList={setBooksList}
                />
                <BookShelf
                    key={"wantToRead"}
                    booksList={wantToReadBooks}
                    title={"Want to Read"}
                    onUpdateBookList={setBooksList}
                />
                <BookShelf key={"read"} booksList={readBooks} title={"Read"} onUpdateBookList={setBooksList} />
            </div>
            <div className="open-search">
                <Link to="/Search">Search Books</Link>
            </div>
        </div>
    );
};

export default Home;
