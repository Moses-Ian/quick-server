const mysql = 
`const mysql = require('mysql2/promise');
require('dotenv').config();

const db = await mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME
});

module.exports = db;`;

module.exports = {
	mysql
};