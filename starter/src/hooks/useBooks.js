// src/hooks/useBooks.js
import { useCallback } from 'react';
import * as BooksAPI from '../BooksAPI';

const useBooks = () => {
    const handleUpdateBook = useCallback(async (book, shelf, onUpdateBookList) => {
        book.shelf = shelf;
        await BooksAPI.update(book, shelf); // Ensure to await the update call

        // Update the local state in SearchBooks
        const updatedBooks = await BooksAPI.getAll();
        onUpdateBookList(updatedBooks);
    }, []);

    return { handleUpdateBook };
};

export default useBooks;
