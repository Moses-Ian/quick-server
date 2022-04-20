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

const sequelize =
`const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
if (process.env.JAWSDB_URL) {
	sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
		host: 'localhost',
		dialect: 'mysql',
		port: 3306,
		logging: false
	});
}

module.exports = sequelize;`;

module.exports = {
	mysql,
	sequelize
};