const fs = require('fs');
const {writeFile, copyFile, appendFile, readThenWrite} = require('./write');
const server = require('../src/server');
const connection = require('../src/connection');
const dbFile = require('../src/db');
const indexHTMLFile = require('../src/index-html.js');
const modelFile = require('../src/model.js');
const seedFile = require('../src/seeds.js');

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
	const view = `${dir}/views`;
	const model = `${dir}/models`;
	
	// create the output directory
	//==================================================================
	// if (!fs.existsSync(dist))
		// fs.mkdirSync(dist);
	// fs.rmdirSync(dir, { recursive: true });
	// fs.mkdirSync(dir)
	
	// create .gitignore, README.md, .env, helpers
	//==================================================================
	copyFile(`${src}/${gitignore}`, `${dir}/${gitignore}`);
	writeFile(`${dir}/${readme}`, `# ${name}`);
	if (answers.database !== 'None') {
		readThenWrite(`${src}/${env}`, `${dir}/${env}`, db);
	}
	// fs.mkdirSync(`${dir}/utils`);
	copyFile(`${src}/helpers.js`, `${dir}/utils/helpers.js`);
	
	// create server.js
	//==================================================================
	let serverOut = '';
	if (answers.server === 'Express') {
		serverOut += server.express;
		if (answers.database === 'MySQL' && answers.orm === 'None')
			serverOut += server.sql;
		if (answers.database === 'MySQL' && answers.orm === 'sequelize')
			serverOut += server.sequelize;
		if (answers.database === 'MongoDB' && answers.odm === 'None')
			serverOut += server.mongo;
		if (answers.database === 'MongoDB' && answers.odm === 'mongoose')
			serverOut += server.mongoose;
		if (answers.view === 'Handlebars')
			serverOut += server.handlebars;
		if (answers.utilities.includes('Session')) {
			server.Out += server.session;
			if (answers.orm === 'sequelize')
				serverOut += server.sessionSequelize;
		}
		serverOut += server.express2;
		if (answers.utilities.includes('Session')) {
			serverOut += server.session2;
			if (answers.orm === 'sequelize')
				serverOut += server.sessionSequelize2;
			serverOut += server.session3;
		}
		serverOut += server.express3;
		if (answers.view !== 'None')
			serverOut += server.html;
		if (answers.database === 'MongoDB' && answers.odm === 'None')
			serverOut += server.mongo2;
		serverOut += server.express4;
		if (answers.view === 'Handlebars')
			serverOut += server.handlebars2;
		if (answers.database === 'None' || answers.database === 'MongoDB')
			serverOut += server.express5;
		if (answers.database === 'MySQL' && answers.orm === 'sequelize')
			serverOut += server.sequelize2
	}

	writeFile(`${dir}/server.js`, serverOut);

	// create connection.js
	//==================================================================
	// fs.mkdirSync(`${dir}/config`);
	// fs.mkdirSync(`${dir}/db`);
	let connectionOut = '';
	if (answers.database === 'MySQL') {
		if (answers.orm === 'None')
			connectionOut = connection.mysql;
		if (answers.orm === 'sequelize')
			connectionOut = connection.sequelize;
		writeFile(`${dir}/db/db.sql`, dbFile(db));
	}
	if (answers.database === 'MongoDB' && answers.odm === 'None')
		connectionOut = connection.mongo(db);
	if (answers.database === 'MongoDB' && answers.odm === 'mongoose')
		connectionOut = connection.mongoose(db);
	
	writeFile(`${dir}/config/connection.js`, connectionOut);
	
	//output view
	//==================================================================
	if (answers.view !== 'None') {
		// fs.mkdirSync(`${dir}/public`);
		// fs.mkdirSync(`${dir}/public/assets`);
		// fs.mkdirSync(`${dir}/public/assets/css`);
		// fs.mkdirSync(`${dir}/public/assets/js`);
		copyFile(`${src}/style.css`, `${dir}/public/assets/css/style.css`);
		copyFile(`${src}/script.js`, `${dir}/public/assets/js/script.js`);
	}
	if (answers.view === 'HTML') {
		writeFile(`${dir}/public/index.html`, indexHTMLFile.html(name));
		answers.pages.forEach(page =>	writeFile(`${dir}/public/${page.page}.html`, indexHTMLFile.html(name)));
	}
	if (answers.view === 'Handlebars') {
		// fs.mkdirSync(view);
		// fs.mkdirSync(`${view}/layouts`);
		// fs.mkdirSync(`${view}/partials`);
		writeFile(`${view}/layouts/main.handlebars`, indexHTMLFile.handlebars(name));
		answers.pages.forEach(page => writeFile(`${dir}/views/${page.page}.handlebars`, ''));
	}
	
	// output model
	//==================================================================
	let userModel = {};
	if (answers.database !== 'None') {
		// fs.mkdirSync(`${dir}/models`);
		// fs.mkdirSync(`${dir}/db/seeds`);
		for(let i=0; i<answers.models.length; i++) {
			answers.models[i].model = answers.models[i].model.trim().toLowerCase();
			answers.models[i].model = answers.models[i].model[0].toUpperCase() + answers.models[i].model.slice(1);
			if (answers.models[i].model === 'User') {
				userModel = answers.models[i];
				answers.models.splice(i, 1);
				i--;
			}
		}
	}
	if (answers.database === 'MySQL') {
		if (answers.orm === 'sequelize') {
			//base
			answers.models.forEach(m => 
				writeFile(`${model}/${m.model}.js`, modelFile.sequelize(m.model)));
			//user
			if (userModel)
				writeFile(`${model}/User.js`, modelFile.sequelizeUser(userModel));
			//index
			answers.models.unshift(userModel);
			writeFile(`${model}/index.js`, modelFile.getIndex(answers.models));
			//seed index
			writeFile(`${dir}/db/seeds/index.js`, seedFile.sequelizeIndex(answers.models));
			//seed data
			answers.models.forEach(m => 
				writeFile(`${dir}/db/seeds/${m.model.toLowerCase()}Data.js`, seedFile.sequelize(m.model)));
		} else {
			//base
			//user
			//index
			//seed index
			//seed data
		}
	}
	if (answers.database === 'MongoDB') {
		if (answers.odm === 'mongoose') {
			//base
			answers.models.forEach(m => 
				writeFile(`${model}/${m.model}.js`, modelFile.mongoose(m.model)));
			//user
			if (userModel)
				writeFile(`${model}/User.js`, modelFile.mongooseUser(userModel));
			//index
			answers.models.unshift(userModel);
			writeFile(`${model}/index.js`, modelFile.getIndex(answers.models));
			//seed index
			//seed data
		} else {
			//base
			//user
			//index
			//seed index
			//seed data
		}
	}
	
}



// for debugging

const answers = {
	server: 'Express',
	database: 'MongoDB',
	odm: 'mongoose',
	view: 'None',
	utilities: ['Session'],
	models: [
		{model: 'user', userProperties: [
			'id',
			'username',
			'email',
			'password',
			'bcrypt',
			'login routes'
		]},
		{model: 'post'},
		{model: 'comment'}
	],
	projectName: 'deck-builder'
}

generateFiles(answers);

















































module.exports = generateFiles;