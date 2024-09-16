import Book from "./Book";
import * as BooksAPI from "../BooksAPI";

const BookShelf = ({ booksList, title, onUpdateBookList }) => {
    const handleUpdateBook = async (book, shelf) => {
        book.shelf = shelf;
        BooksAPI.update(book, shelf);

        onUpdateBookList((prevBooks) => prevBooks.map((b) => (b.id === book.id ? { ...b, shelf: shelf } : b)));

        // Re-fetch the books list from the API to ensure it's up to date
        const updatedBooks = await BooksAPI.getAll();
        onUpdateBookList(updatedBooks);
    };

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {booksList.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onUpdateBookCategory={handleUpdateBook} isVisible={true} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default BookShelf;
