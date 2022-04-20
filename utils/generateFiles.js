const fs = require('fs');
const {writeFile, copyFile, appendFile, readThenWrite} = require('./write');
const server = require('../src/server');

const dist = './dist';
const src = './src';

const gitignore = '.gitignore';
const readme = 'README.md';
const env = '.env';

function generateFiles(answers) {
	//develop
	answers.projectName = 'deck-builder';
	//end develop
	console.log(answers);
	
	const dir = `${dist}/${answers.projectName}`;
	const name = answers.projectName.split(/[-_]/).map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
	const db = answers.projectName.split('-').join('_').concat('_db');
	
	// create the output directory
	// if (!fs.existsSync(dist))
		// fs.mkdirSync(dist);
	// fs.rmdirSync(dir, { recursive: true });
	// fs.mkdirSync(dir)
	
	// create .gitignore, README.md, .env, helpers
	// copyFile(`${src}/${gitignore}`, `${dir}/${gitignore}`);
	// writeFile(`${dir}/${readme}`, `# ${name}`);
	// if (answers.database !== 'None') {
		// readThenWrite(`${src}/${env}`, `${dir}/${env}`, db);
	// }
	// fs.mkdirSync(`${dir}/utils`);
	// copyFile(`${src}/helpers.js`, `${dir}/utils/helpers.js`);
	
	// create server.js
	let serverOut = '';
	if (answers.server === 'Express')
		serverOut += server.express;
	if (answers.server === 'Express')
		serverOut += server.express2;
	if (answers.server === 'Express')
		serverOut += server.express3;
	if (answers.server === 'Express')
		serverOut += server.express4;
	if (answers.server === 'Express' && answers.database === 'None')
		serverOut += server.express5;
	
	
	writeFile(`${dir}/server.js`, serverOut);
	
	
	
	
}

module.exports = generateFiles;