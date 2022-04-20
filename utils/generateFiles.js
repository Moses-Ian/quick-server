const fs = require('fs');
const {writeFile, copyFile, appendFile, readThenWrite} = require('./write');
const server = require('../src/server');
const connection = require('../src/connection');
const dbFile = require('../src/db');

const dist = './dist';
const src = './src';

const gitignore = '.gitignore';
const readme = 'README.md';
const env = '.env';

function generateFiles(answers) {
	//develop
	// answers.projectName = 'deck-builder';
	//end develop
	console.log(answers);
	
	const dir = `${dist}/${answers.projectName}`;
	const name = answers.projectName.split(/[-_]/).map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
	const db = answers.projectName.split('-').join('_').concat('_db');
	
	// create the output directory
	if (!fs.existsSync(dist))
		fs.mkdirSync(dist);
	fs.rmdirSync(dir, { recursive: true });
	fs.mkdirSync(dir)
	
	// create .gitignore, README.md, .env, helpers
	copyFile(`${src}/${gitignore}`, `${dir}/${gitignore}`);
	writeFile(`${dir}/${readme}`, `# ${name}`);
	if (answers.database !== 'None') {
		readThenWrite(`${src}/${env}`, `${dir}/${env}`, db);
	}
	fs.mkdirSync(`${dir}/utils`);
	copyFile(`${src}/helpers.js`, `${dir}/utils/helpers.js`);
	
	// create server.js
	let serverOut = '';
	if (answers.server === 'Express')
		serverOut += server.express;
	if (answers.database === 'MySQL' && answers.orm === 'None')
		serverOut += server.sql;
	if (answers.server === 'Express')
		serverOut += server.express2;
	if (answers.server === 'Express')
		serverOut += server.express3;
	if (answers.server === 'Express')
		serverOut += server.express4;
	if (answers.server === 'Express' && answers.database === 'None')
		serverOut += server.express5;
	



	writeFile(`${dir}/server.js`, serverOut);

	// create connection.js
	fs.mkdirSync(`${dir}/config`);
	fs.mkdirSync(`${dir}/db`);
	let connectionOut = '';
	if (answers.database === 'MySQL' && answers.orm === 'None') {
		connectionOut = connection.mysql;
		writeFile(`${dir}/db/db.sql`, dbFile(db));
	}
	
	writeFile(`${dir}/config/connection.js`, connectionOut);
	
	
	
	
	
	
}

module.exports = generateFiles;