const inquirer = require('inquirer');

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
		choices: ['Express'],
		default: 'Express'
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
		choices: ['Session', 'IndexedDB', 'webpack', 'Service Worker', 'PWA']
	}
];

const promptUser = () => inquirer.prompt(questions);

promptUser()
	.then(answers => console.log(answers))
	.catch(err => console.error(err));