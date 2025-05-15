const Book = require('../models/bookModel');

const index = async (req, res) => {
  try {
    const { sortBy, sortOrder, search, ...filters } = req.query; // Dynamically pulls all remaining req.query keys except sortBy, sortOrder, and search into filters using destructuring
    const books = await Book.getBooksByFilters(filters, sortBy, sortOrder, search);
    res.render('pages/books', { title: 'Books', books, query: req.query });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Internal Server Error');
  }
};
const showCreateForm = (req, res) => {
    res.render('pages/create', { title: 'Create' });
}
const create = async (req, res) => {
    const { title, author, genre, publication_date, isbn, price, publisher, page_count, language, available, summary } = req.body;
    try {
        await Book.addBook({title, author, genre, publication_date, isbn, price, publisher, page_count, language, available, summary});
        res.redirect('/books');
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).send('Internal Server Error');
    }
}
const deleteBook = async (req, res) => {
    const bookId = req.params.id;
    try {
        await Book.deleteBook(bookId);
        res.json({ redirect: '/books' });
        // res.redirect('/books');
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Internal Server Error deleting');
    }
}
const showEditForm = async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await Book.getBookById(bookId);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.render('pages/edit', { title: 'Edit Book', book });
    } catch (error) {
        console.error('Error fetching book for editing:', error);
        res.status(500).send('Internal Server Error editing');
    }
}

const update = async (req, res) => {
    const bookId = req.params.id;
    const { title, author, genre, publication_date, isbn, price, publisher, page_count, language, available, summary } = req.body;
    try {
        await Book.updateBook(bookId, { title, author, genre, publication_date, isbn, price, publisher, page_count, language, available, summary });
        // res.json({ redirect: '/books' });
        res.redirect('/books');
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).send('Internal Server Error updating');
    }
}
const show = async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await Book.getBookById(bookId);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.render('pages/details', { title: 'Book Details', book });
    } catch (error) {
        console.error('Error fetching book details:', error);
        res.status(500).send('Internal Server Error showing details');
    }
}


module.exports = {
    index,
    showCreateForm,
    create,
    deleteBook,
    showEditForm,
    update,
    show
}


/*
this code is too verbose and not flexible. if a new filter is added, we need to add it here manually
const showBooks = async (req, res) => {
  try {
    const filters = {
      author: req.query.author,
      title: req.query.title,
      genre: req.query.genre,
      publisher: req.query.publisher,
      isbn: req.query.isbn,
      language: req.query.language,
      publication_date: req.query.publication_date,
      available: req.query.available,
    };

    const { sortBy, sortOrder } = req.query;

    const books = await Book.getBooksByFilters(filters, sortBy, sortOrder);

    res.render('pages/books', { title: 'Books', books, query: req.query });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Internal Server Error');
  }
};
*/