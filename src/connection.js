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

const mongo = name => 
`const {MongoClient} = require('mongodb'); 

const uri = 'mongodb://127.0.0.1:27017/${name}'; 
const client = new MongoClient(process.env.MONGODB_URI || uri); 
client.connect(); 

module.exports = client;`;

const mongoose = name =>
`const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/${name}'; 
mongoose.connect(process.env.MONGODB_URI || uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('debug', false);

module.exports = mongoose;`;

module.exports = {
	mysql,
	sequelize,
	mongo,
	mongoose
};