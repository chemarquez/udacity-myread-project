const BookShelfChanger = ({ book, onUpdateBookCategory, isVisible }) => {
    const handleChange = (event) => {
        const newCategory = event.target.value; // Get the selected value from the event
        onUpdateBookCategory(book, newCategory); // Call the parent function with the book and new category
    };
    if (!isVisible) {
        return <div></div>;
    }

    return (
        <div className="book-shelf-changer">
            <select onChange={handleChange} value={book.shelf}>
                <option value="none" disabled>
                    Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
            </select>
        </div>
    );
};

export default BookShelfChanger;
