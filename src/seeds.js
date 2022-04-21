const sequelizeIndex = (models) => {
	let output = 
`const sequelize = require('../../config/connection');`;
	models.forEach(m => output += 
`
const seed${m.model} = require('./${m.model.toLowerCase()}Data');`);
	output +=
`

const seedAll = async () => {
	await sequelize.sync({ force: true });`;
	models.forEach(m => output +=
`

	try {
		await seed${m.model}();
	} catch (err) {
		console.error('error when seeding ${m.model}s');
		console.log(err);
	}`);
	output +=
`

	process.exit(0);
};

seedAll();`;
	return output;
};

const sequelize = (name) => 
`const { ${name} } = require('../../models');

const ${name.toLowerCase()}Data = [];

const seed${name} = () => ${name}.bulkCreate(${name.toLowerCase()}Data);

module.exports = seed${name};`

module.exports = {
	sequelizeIndex,
	sequelize
};