const express =
`const express = require('express');
const routes = require('./routes');
const path = require('path');
const helpers = require('./utils/helpers');`
/*
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
*/

const express2 =
`

const app = express();
const PORT = process.env.PORT || 3001;`;


/*
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
*/

const express3 =
`

app.use(express.json());
app.use(express.urlencoded({ extended: true }));`;

/*
app.use(express.static(path.join(__dirname, 'public')));
*/

const express4 =
`

app.use(routes);`;

/*
// use handlebars
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
sequelize.sync({ force: false })
	.then(() => 
		app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
	)
	.catch(err => console.log(err));
	*/
	
const express5 = 
'\n\n\
app.listen(PORT, () => { \n\
  console.log(`Server running on port ${PORT}`); \n\
});';

module.exports = {
	express,
	express2,
	express3,
	express4,
	express5
};