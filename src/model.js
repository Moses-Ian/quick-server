let sequelize = (name) => 
`const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ${name} extends Model {
}

${name}.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: '${name.toLowerCase()}'
	}
);

module.exports = ${name};`;


let sequelizeUser = ({model, userProperties}) => {
	const outArr = [
`const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');`,
`
const bcrypt = require('bcrypt');`,
`

class User extends Model {`,
`
	checkPassword(loginPw) {`,
`
		return bcrypt.compareSync(loginPw, this.password);`,
`
	}`,
`
}

User.init(
	{`,
`
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},`,
`
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},`,
`
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},`,
`
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [4]
			}
		}`,
`
	},
	{`,
`
		hooks: {
			async beforeCreate(newUserData) {
				newUserData.password = await bcrypt.hash(newUserData.password, 10);
				return newUserData;
			},
			
			async beforeUpdate(updatedUserData) {
				updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
				return updatedUserData;
			}`,
`
		},
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'user'
  }
);

module.exports = User;`
];
	let output = outArr[0];
	output += userProperties.includes('bcrypt') ? outArr[1] : '';
	output += outArr[2];
	output += userProperties.includes('password') ? outArr[3] : '';
	output += userProperties.includes('bcrypt') &&
		userProperties.includes('password') ? outArr[4] : '';
	output += userProperties.includes('password') ? outArr[5] : '';
	output += outArr[6];
	output += userProperties.includes('id') ? outArr[7] : '';
	output += userProperties.includes('username') ? outArr[8] : '';
	output += userProperties.includes('email') ? outArr[9] : '';
	output += userProperties.includes('password') ? outArr[10] : '';
	output += outArr[11];
	output += userProperties.includes('bcrypt') &&
		userProperties.includes('password') ? outArr[12] : '';
	output += outArr[13];
	return output;
};

let getIndex = (models) => {
	let output = '';
	for (let i=0; i<models.length; i++)
		output += `const ${models[i].model} = require('./${models[i].model});` + '\n';
	output += '\nmodule.exports = { ';
	for (let i=0; i<models.length-1; i++)
		output += `${models[i].model}, `;
	if (models.length > 0)
		output += `${models[models.length-1].model}`
	output += ' };';
	
	return output;
}

module.exports = {
	sequelize,
	sequelizeUser,
	getIndex
};