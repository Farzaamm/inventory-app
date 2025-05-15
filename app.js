const express = require('express');
const indexRoutes = require('./routes/indexRoutes');
const booksRoutes = require('./routes/booksRoutes');
require('dotenv').config();
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRoutes);

app.get('/about', (req, res) => {
  res.render('pages/about', { title: 'About' });
});

app.use('/books', booksRoutes);
app.use('/books/create', booksRoutes);
app.use('/books/details/:id', booksRoutes);


app.use((req, res) => {
  res.status(404).render('pages/404', { title: '404 Not Found' });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
