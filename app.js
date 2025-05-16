const express = require('express');
const indexRoutes = require('./routes/indexRoutes');
const booksRoutes = require('./routes/booksRoutes');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// indexRoutes
app.use('/', indexRoutes);

// booksRoutes
app.use('/books', booksRoutes);
app.use('/books/create', booksRoutes);
app.use('/books/details/:id', booksRoutes);


app.use((req, res) => {
  res.status(404).render('pages/404', { title: '404 Not Found' });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
