const controller = ({model, userProperties}, {orm, odm, ...answers}) => {
	let lowerModel = model[0].toLowerCase() + model.slice(1);
	let output = 
`const { ${model} } = require('../models');

const ${lowerModel}Controller = {
	getAll${model}(req, res) {`;
	
	if (odm && odm == 'mongoose')
		output += `
		${model}.find({})
			.select('-__v')`;
	if (orm && orm == 'sequelize')
		output += `
		${model}.findAll({})`;
			
	output += `
			.then(db${model}Data => res.json(db${model}Data))
			.catch(err => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	get${model}ById({ params }, res) {`;
	
	
	if (odm && odm == 'mongoose')
		output += `
		${model}.findOne({ _id: params.id })
			.select('-__v')`;
	if (orm && orm == 'sequelize')
		output += `
		${model}.findOne({
			where: {
				id: req.params.id
			}
		})`;


	output += `
			.then(db${model}Data => {
				if (!db${model}Data) {
					res.status(404).json({ message: 'No ${lowerModel} found with this id!' });
					return;
				}
				res.json(db${model}Data);
			})
			.catch(err => {
				console.log(err);
				res.status(400).json(err);
			});
	},
		
	create${model}({ body }, res) {`;
	
	
	if (odm && odm == 'mongoose')
		output += `
		${model}.create(body)`;
	if (orm && orm == 'sequelize')
		output += `
		${model}.create(req.body)`;
		
		
	output += `
			.then(db${model}Data => res.json(db${model}Data))
			.catch(err => res.status(400).json(err));
	},

	update${model}({ params, body }, res) {`;
	
	
	if (odm && odm == 'mongoose')
		output += `
		${model}.findOneAndUpdate({ _id: params.id }, body, {})`;
	if (orm && orm == 'sequelize')
		output += `
		${model}.update(req.body, {
			where: {
				id: req.params.id
			}
		})`;


	output += `
			.then(db${model}Data => {
				if (!db${model}Data) {
					res.status(404).json({ message: 'No ${lowerModel} found with this id!' });
					return;
				}
				res.json(db${model}Data);
			})
			.catch(err => res.status(400).json(err));
	},	

	delete${model}({ params }, res) {`;


	if (odm && odm == 'mongoose')
		output += `
		${model}.findOneAndDelete({ _id: params.id })`;
	if (orm && orm == 'sequelize')
		output += `
		${model}.destroy({
			where: {
				id: req.params.id
			}
		})`;


	output += `
			.then(db${model}Data => {
				if (!db${model}Data) {
					res.status(404).json({ message: 'No ${lowerModel} found with this id!' });
					return;
				}
				res.json(db${model}Data);
			})
			.catch(err => res.status(400).json(err));
	}`;
			
	if (model.toLowerCase() === 'user' && userProperties.includes('login routes')) {
		output += `,
		
	login(req, res) {`;
		
		
		if (odm && odm == 'mongoose')
			output += `
		${model}.findOne({ email: req.body.email })`;
		if (orm && orm == 'sequelize')
			output += `
		${model}.findOne({
			where: {
				email: req.body.email
			}
		})`;
			
		output += `
			.then(db${model}Data => {
				if (!db${model}Data) {
					res.status(400).json({ statusMessage: 'No user with that email address!' });
					return;
				}`;
				
		if (orm && orm === 'sequelize' && userProperties.includes('bcrypt'))
			output += `
				const validPassword = db${model}Data.checkPassword(req.body.password);

				if (!validPassword) {
					res.status(400).json({ message: 'Incorrect password!' });
					return;
				}`;
				
		if (answers.utilities.includes('Session'))
			output += `

				req.session.save(() => {
					req.session.user_id = db${model}Data.id;
					req.session.username = db${model}Data.username;
					req.session.loggedIn = true;
					res.redirect('/');
				});`;
		
		output += `
			});
	},
		
	logout(req, res) {`;
	
		if (answers.utilities.includes('Session'))
			output += `
		if (req.session.loggedIn) {
			req.session.destroy(() => {
				res.status(204).end();
			});
		}
		else {
			res.status(404).end();
		}`;
		
	output += `
	}`;
	
	}
			
	output += `
};

module.exports = ${lowerModel}Controller;`;

	return output;
}

module.exports = controller;