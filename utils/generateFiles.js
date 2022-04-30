const fs = require('fs');
const {writeFile, copyFile, appendFile, readThenWrite} = require('./write');
const server = require('../src/server');
const connection = require('../src/connection');
const dbFile = require('../src/db');
const indexedDB = require('../src/idb.js');
const manifest = require('../src/manifest.js');
const indexHTMLFile = require('../src/index-html.js');
const serviceWorker = require('../src/service-worker.js');
const modelFile = require('../src/model.js');
const seedFile = require('../src/seeds.js');
const routeFile = require('../src/routes.js');

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
	
	// output indexedDB
	//==================================================================
	if (answers.utilities.includes('IndexedDB')) {
		writeFile(`${dir}/public/assets/js/idb.js`, indexedDB(answers.projectName, answers.idbName));
	}

	// output manifest.json
	//==================================================================
	if (answers.utilities.includes('PWA')) {
		writeFile(`${dir}/public/manifest.json`, manifest(name));
	}



	
	//output view
	//==================================================================
	if (answers.view !== 'None') {
		// fs.mkdirSync(`${dir}/public`);
		// fs.mkdirSync(`${dir}/public/assets`);
		// fs.mkdirSync(`${dir}/public/assets/css`);
		// fs.mkdirSync(`${dir}/public/assets/js`);
		copyFile(`${src}/style.css`, `${dir}/public/assets/css/style.css`);
		copyFile(`${src}/script.js`, `${dir}/public/assets/js/script.js`);
		answers.pages.forEach(p => p.page = p.page.trim().toLowerCase());
	}
	if (answers.view === 'HTML' || answers.view === 'Handlebars') {
		if (answers.view === 'Handlebars') {
			// fs.mkdirSync(view);
			// fs.mkdirSync(`${view}/layouts`);
			// fs.mkdirSync(`${view}/partials`);
		}
		let viewOut = indexHTMLFile.head;
		if (answers.utilities.includes('PWA'))
			viewOut += indexHTMLFile.manifest;
		if (answers.view === 'HTML')
			viewOut += indexHTMLFile.html(name);
		if (answers.view === 'Handlebars')
			viewOut += indexHTMLFile.handlebars(name);
		if (answers.utilities.includes('IndexedDB'))
			viewOut += indexHTMLFile.idb;
		viewOut += indexHTMLFile.endBody;
		if (answers.utilities.includes('Service Worker'))
			viewOut += indexHTMLFile.serviceWorker;
		viewOut += indexHTMLFile.endTag;

		let viewFile = answers.view === 'HTML' ?
			`${dir}/public/index.html` : `${view}/layouts/main.handlebars`;
		writeFile(viewFile, viewOut);
	}
	
	
	
	
	if (answers.view === 'HTML') {
		answers.pages.forEach(page =>	writeFile(`${dir}/public/${page.page}.html`, indexHTMLFile.html(name)));
		if (answers.utilities.includes('Service Worker')) {
			answers.pages.unshift({page: 'index'});
			answers.pages.forEach(page => page.page += '.html');
			writeFile(`${dir}/service-worker.js`, serviceWorker(answers.projectName, answers.pages));
		}
	}
	if (answers.view === 'Handlebars') {
		answers.pages.forEach(page => writeFile(`${dir}/views/${page.page}.handlebars`, ''));
		if (answers.utilities.includes('Service Worker'))
			writeFile(`${dir}/service-worker.js`, serviceWorker(answers.projectName, []));
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
	
	// output routes
	//==================================================================
	// fs.mkdirSync(`${dir}/routes`);
	writeFile(`${dir}/routes/index.js`, routeFile.routesIndex(answers));
	if (answers.database !== 'None') {
		// fs.mkdirSync(`${dir}/routes/api`);
		writeFile(`${dir}/routes/api/index.js`, routeFile.apiIndex(answers.models));
		// model-routes.js
		answers.models.forEach(m => writeFile(`${dir}/routes/api/${m.model}-routes.js`, routeFile.modelRoute(m)));
	}
	if (answers.view !== 'None') {
		// fs.mkdirSync(`${dir}/routes/html`);
		writeFile(`${dir}/routes/html/index.js`, routeFile.htmlIndex(answers.pages));
		answers.pages.forEach(p => writeFile(`${dir}/routes/html/${p.page}-routes.js`, routeFile.pageRoute(p.page, answers.view)));
		writeFile(`${dir}/routes/html/home-routes.js`, routeFile.pageRoute('index', answers.view));
	}















	
	
	
	// output controllers
	//==================================================================

}



// for debugging

const answers = {
	server: 'Express',
	database: 'MongoDB',
	odm: 'mongoose',
	view: 'HTML',
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
	pages: [
		{page: 'dashboard'},
		{page: 'contact'}
	],
	projectName: 'deck-builder'
}

// generateFiles(answers);

















































module.exports = generateFiles;