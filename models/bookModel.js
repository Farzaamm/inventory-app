const pool = require('../db/pool');

const Book = {
  getAllBooks: async (sortBy = 'id', sortOrder = 'DESC') => {
    const validColumns = ['id', 'title', 'author', 'isbn', 'publisher', 'genre', 'publication_date', 'price', 'page_count', 'language', 'availabile'];
    const validOrders = ['ASC', 'DESC'];
    // Validate sortBy and SortOrder 
    if (!validColumns.includes(sortBy)) sortBy = 'id'; // Default to 'title'
    if (!validOrders.includes(sortOrder.toUpperCase())) sortOrder = 'ASC'; // Default to 'ASC'

    try {
      const result = await pool.query(`SELECT * FROM book ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`);
      return result.rows;
    } catch (error) {
      console.error('Error fetching books (in bookModel.js):', error);
      throw error;
    }
  },

  getBookById: async (id) => {
    try {
      const result = await pool.query('SELECT * FROM book WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching book by ID (in bookModel.js):', error);
      throw error;
    }
  },

  getBookByAuthor: async (author) => {
    try {
      const result = await pool.query('SELECT * FROM book WHERE author = $1', [author]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching book by author (in bookModel.js):', error);
      throw error;
    }
  },
  getBookByIsbn: async (isbn) => {
    try {
      const result = await pool.query('SELECT * FROM book WHERE isbn = $1', [isbn]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching book by ISBN (in bookModel.js):', error);
      throw error;
    }
  },
  getBookByPublisher: async (publisher) => {
    try {
      const result = await pool.query('SELECT * FROM book WHERE publisher = $1', [publisher]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching book by publisher (in bookModel.js):', error);
      throw error;
    }
  },
  getBookByTitle: async (title) => {
    try {
      const result = await pool.query('SELECT * FROM book WHERE title = $1', [title]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching book by title (in bookModel.js):', error);
      throw error;
    }
  },
  getBookByGenre: async (genre) => {
    try {
      const result = await pool.query('SELECT * FROM book WHERE genre = $1', [genre]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching book by genre (in bookModel.js):', error);
      throw error;
    }
  },
  getBookByDate: async (date) => {
    try {
      const result = await pool.query('SELECT * FROM book WHERE date = $1', [date]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching book by date (in bookModel.js):', error);
      throw error;
    }
  },
  addBook: async (book) => {
    const { title, author, genre, publication_date, isbn, price, publisher, page_count, language, available, summary } = book;
    try {
      const result = await pool.query(
        'INSERT INTO book (title, author, genre, publication_date, isbn, price, publisher, page_count, language, available, summary) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
        [title, author, genre, publication_date, isbn, price, publisher, page_count, language, available, summary]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error adding book (in bookModel.js):', error);
      throw error;
    }
  },
  updateBook: async (id, book) => {
    const { title, author, genre, publication_date, isbn, price, publisher, page_count, language, available, summary } = book;
    try {
      const result = await pool.query(
        'UPDATE book SET title = $1, author = $2, genre = $3, publication_date = $4, isbn = $5, price = $6, publisher = $7, page_count = $8, language = $9, available = $10, summary = $11 WHERE id = $12 RETURNING *',
        [title, author, genre, publication_date, isbn, price, publisher, page_count, language, available, summary, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error updating book (in bookModel.js):', error);
      throw error;
    }
  },
  deleteBook: async (id) => {
    try {
      const result = await pool.query('DELETE FROM book WHERE id = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error deleting book (in bookModel.js):', error);
      throw error;
    }
  },
  getBooksByFilters: async (filters, sortBy = 'id', sortOrder = 'ASC', search) => {
  const validColumns = ['id', 'title', 'author', 'isbn', 'publisher', 'genre', 'publication_date', 'price', 'page_count', 'language', 'available'];
  const validOrders = ['ASC', 'DESC'];

  if (!validColumns.includes(sortBy)) sortBy = 'id';
  if (!validOrders.includes(sortOrder?.toUpperCase())) sortOrder = 'ASC';

  let baseQuery = 'SELECT * FROM book';
  const conditions = [];
  const values = [];
  let idx = 1;

  for (const key in filters) {
    if (filters[key]) {
      conditions.push(`${key} ILIKE $${idx}`);  // Use ILIKE for case-insensitive partial matching (PostgreSQL)
      values.push(`%${filters[key]}%`);
      idx++;
    }
  }
  if (search) {
    // Add search condition
    // ILIKE is a text comparison operator, so we need to convert other types(like numbers and dates) to text. hence the use of `::text`
    const searchCondition = `(
      title ILIKE $${idx} OR 
      author ILIKE $${idx} OR 
      genre ILIKE $${idx} OR 
      publisher ILIKE $${idx} OR
      isbn ILIKE $${idx} OR
      publication_date::text ILIKE $${idx} OR 
      price::text ILIKE $${idx} OR
      page_count::text ILIKE $${idx} OR
      language ILIKE $${idx}
    )`;
    conditions.push(searchCondition);
    values.push(`%${search}%`);
    idx++;
  }

  if (conditions.length > 0) {
    baseQuery += ' WHERE ' + conditions.join(' AND ');
  }

  baseQuery += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;

  try {
    const result = await pool.query(baseQuery, values);
    return result.rows;
  } catch (error) {
    console.error('Error fetching filtered books:', error);
    throw error;
  }
}

};

module.exports = Book;

