const fs = require('fs');
const {writeFile, copyFile, appendFile, readThenWrite} = require('./write');
const {
} = require ('./files');

const dist = './dist';
const src = './src';

const gitignore = '.gitignore';
const readme = 'README.md';
const env = '.env';

function generateFiles(answers) {
	console.log(answers);
	
	const dir = `${dist}/${answers.projectName}`;
	const name = answers.projectName.split(/[-_]/).map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
	const db = answers.projectName.split('-').join('_').concat('_db');
	
	// delete everything in dist and start over
	if (!fs.existsSync(dist))
		fs.mkdirSync(dist);
	fs.rmdirSync(dir, { recursive: true });
	fs.mkdirSync(dir)
	
	copyFile(`${src}/${gitignore}`, `${dir}/${gitignore}`);
	writeFile(`${dir}/${readme}`, `# ${name}`);
	if (answers.database !== 'None') {
		readThenWrite(`${src}/${env}`, `${dir}/${env}`, db);
	}
}

module.exports = generateFiles;