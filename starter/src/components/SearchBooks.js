import Book from "./Book";
import { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";

const SearchBooks = () => {
    // State for the input value
    const [query, setQuery] = useState("");

    // State for the list of books
    const [results, setResults] = useState([]);

    // Effect to handle changes in the query input
    useEffect(() => {
        const fetchResults = async () => {
            if (query.trim() === "") {
                // Clear the list if input is empty
                setResults([]);
            } else {
                // Call the API when input is not empty
                try {
                    const searchResults = await BooksAPI.search(query, 20);
                    setResults(searchResults);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            }
        };

        fetchResults();
    }, [query]); // Depend on query so effect runs when it changes

    // Handle input change
    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">
                    Close Search
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Search by title, author, or ISBN"
                    />
                </div>
            </div>
            <div className="search-books-results">
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {results.map((book) => (
                            <li key={book.id}>
                                <Book book={book} isVisible={false} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default SearchBooks;
