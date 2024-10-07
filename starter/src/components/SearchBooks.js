import Book from "./Book";
import { useState, useEffect, useCallback } from "react";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";
import useBooks from "../hooks/useBooks";

const SearchBooks = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const { handleUpdateBook } = useBooks();
    const [refresh, setRefresh] = useState(false);

    // Use useCallback to memoize fetchResults
    const fetchResults = useCallback(async () => {
        if (query.trim() === "") {
            setResults([]);
        } else {
            try {
                const searchResults = await BooksAPI.search(query, 20);
                if (searchResults.error) {
                    setResults([]);
                } else {
                    setResults(searchResults);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
                setResults([]); // Clear results on error
            }
        }
    }, [query]); // Depend on query

    useEffect(() => {
        fetchResults();
    }, [fetchResults, refresh]); // Depend on query and refresh to trigger fetching results

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const updateBookCategory = async (book, shelf) => {
        await handleUpdateBook(book, shelf, setResults);
        // Trigger refresh
        setRefresh((prev) => !prev);
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
                        {results.length === 0 ? (
                            <li>No results available</li> // Display message if no results
                        ) : (
                            results.map((book) => (
                                <li key={book.id}>
                                    <Book book={book} onUpdateBookCategory={updateBookCategory} isVisible={true} />
                                </li>
                            ))
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default SearchBooks;
