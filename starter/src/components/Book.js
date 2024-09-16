import BookShelfChanger from "./BookShelfChanger";

const Book = ({ book, onUpdateBookCategory, isVisible }) => {
    if (!book) {
        return <div>Empty</div>;
    }

    const defaultImage = "../icons/defaultThumbnail.png";

    const imageUrl = book.imageLinks?.thumbnail ? `url(${book.imageLinks.thumbnail})` : `url(${defaultImage})`;

    const style = {
        width: 128,
        height: 188,
        backgroundImage: imageUrl,
    };

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={style}></div>
                <BookShelfChanger book={book} onUpdateBookCategory={onUpdateBookCategory} isVisible={isVisible} />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors ? book.authors.join(", ") : "N/A"}</div>
        </div>
    );
};

export default Book;
