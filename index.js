const inquirer = require('inquirer');
const generateFiles = require('./utils/generateFiles');

const questions = [
	{
		type: 'input',
		name: 'projectName',
		message: 'What is the project name?',
		validate: input => {
			if (/^[\w-_]+$/.test(input))
				return true;
			console.log('Project name must be alphanumeric! Dashes and underscores are ok.');
			return false;
		}
	},
	{
		type: 'list',
		name: 'server',
		message: 'What server would you like to use?',
		choices: ['Express', 'None'],
		default: 'None'
	},
	{
		type: 'list',
		name: 'database',
		message: 'What database would you like to use?',
		choices: ['MySQL', 'MongoDB', 'None'],
		default: 'None'
	},
	{
		type: 'list',
		name: 'orm',
		message: 'What ORM would you like to use?',
		choices: ['sequelize', 'None'],
		default: 'None',
		when: (answers) => answers.database === 'MySQL'
	},
	{
		type: 'list',
		name: 'odm',
		message: 'What ODM would you like to use?',
		choices: ['mongoose', 'None'],
		default: 'None',
		when: (answers) => answers.database === 'MongoDB'
	},
	{
		type: 'list',
		name: 'view',
		message: 'What do you want for your view?',
		choices: ['Handlebars', 'HTML', 'None'],
		default: 'None'
	},
	{
		type: 'checkbox',
		name: 'utilities',
		message: 'What utilities do you want?',
		choices: ['Session', 'IndexedDB', 'Service Worker', 'PWA']
	},
	{
		type: 'input',
		name: 'idbName',
		message: "What is the name of the object you're storing in IndexedDB?",
		when: (answers) => answers.utilities.includes('IndexedDB')
	}
];

const addPageQuestion = [
	{
		type: 'input',
		name: 'page',
		message: 'What is the title of a PAGE you would like to add?\n (Leave blank when done adding pages)'
	}
];

const addModelQuestion = [
	{
		type: 'input',
		name: 'model',
		message: 'What is the name of a MODEL you would like to add?\n (Leave blank when done adding models)'
	},
	{
		type: 'checkbox',
		name: 'userProperties',
		message: 'USER MODEL DETECTED\nDo you want any of these defaults?',
		choices: [
			{name: 'id', checked: true},
			{name: 'username', checked: true},
			{name: 'email', checked: true},
			{name: 'password', checked: true},
			{name: 'bcrypt', checked: true},
			{name: 'login routes', checked: true}
		],
		when: (answers) => answers.model.trim().toLowerCase() === 'user'
	}
]

const promptUser = () => inquirer.prompt(questions);

promptUser()
	.then(async answers => {
		if (answers.view === 'None')
			return answers;
		answers.pages = [];
		while(true) {
			let pageAnswer = await inquirer.prompt(addPageQuestion);
			if (pageAnswer.page === '')
				break;
			answers.pages.push(pageAnswer);
		}
		return answers;
	})
	.then(async answers => {
		if (answers.database === 'None')
			return answers;
		answers.models = [];
		while(true) {
			let modelAnswer = await inquirer.prompt(addModelQuestion);
			if (modelAnswer.model === '')
				break;
			answers.models.push(modelAnswer);
		}
		return answers;
	})
	.then(generateFiles)
	.catch(err => console.error(err));
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	