const mysql = require('mysql');

// Membuat Koneksi ke Database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: 'UTC'
});

// Test koneksi ke database
const testConnection = db.connect((err) => {
    if (err) { throw err; };
    console.log('Terhubung dengan database... ');
});

// Insert to database
const insertQuery = (sql, data) => {
    db.query(sql, data, (err) => {
        if (err) { throw err; };
    })
};

// Select a query
const selectAQuery = (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject(new Error('Database select failed: ' + err.message));
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = { db, testConnection, insertQuery, selectAQuery };