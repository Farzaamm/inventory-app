require('dotenv').config({ path: './.env' }); // Load environment variables from .env file
const { Pool } = require('pg');


const pool = new Pool({
    connectionString: process.env.DB_URL,
});


// Test the connection
pool.connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });


module.exports = pool;
