import Book from "./Book";
import useBooks from "../hooks/useBooks";

const BookShelf = ({ booksList, title, onUpdateBookList }) => {
    const { handleUpdateBook } = useBooks();

    const updateBookCategory = async (book, shelf) => {
        await handleUpdateBook(book, shelf, onUpdateBookList);
    };

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {booksList.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onUpdateBookCategory={updateBookCategory} isVisible={true} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default BookShelf;
