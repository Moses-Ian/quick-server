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

const mongo = 
"const {MongoClient} = require('mongodb'); \n\
//require('dotenv').config(); \n\
\n\
const uri = 'mongodb://127.0.0.1:27017'; \n\
//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.gb1vu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`; \n\
const client = new MongoClient(uri); \n\
client.connect(); \n\
\n\
module.exports = client;";

module.exports = {
	mysql,
	sequelize,
	mongo
};