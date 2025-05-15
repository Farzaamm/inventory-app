const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');


// CREATE
// Show form to create a new book
router.get('/create', bookController.showCreateForm);

// Handle book creation
router.post('/create', bookController.create);

// READ
// List all books
router.get('/', bookController.index);

// Show details of a single book
router.get('/:id', bookController.show);

// UPDATE
// Show edit form for a specific book
router.get('/:id/edit', bookController.showEditForm);

// Handle book update
router.post('/:id/edit', bookController.update);

// DELETE
// Delete a specific book
router.delete('/:id', bookController.deleteBook);


module.exports = router;
