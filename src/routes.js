const router = `const router = require('express').Router();
`;
const exp = 
`

module.exports = router;`;

const routesIndex = ({database, view}) => {
	let output = router;
	if (database !== 'None')
		output +=
`
router.use('/api', require('./api'));`;
	if (view !== 'None')
		output +=
`
router.use('/', require('./html'));`;
	output +=
`

router.use((req, res) => 
	res.status(404).send('<h1>404 Error!</h1>'));`;
	output += exp;

	return output;
}

const apiIndex = (models) => {
	let output = router;
	for(let i=0; i<models.length; i++) 
		output +=
`
router.use('/${models[i].model.toLowerCase()}', require('./${models[i].model.toLowerCase()}-routes'));`;
	output += exp;

	return output;
}

const htmlIndex = (pages) => {
	let output = router;
	for(let i=0; i<pages.length; i++)
		output +=
`
router.use('/${pages[i].page}', require('./${pages[i].page}-routes.js'));`;
	output +=
`
router.use('/', require('./home-routes.js'));`;
	output += exp;

	return output;
}

const pageRoute = (page, view) => {
	let output = router;
	if (view === 'HTML')
		output +=
`const path = require('path');`;
	output +=
`

router.get('/', (req, res) => {`;
	if (view === 'HTML')
		output +=
`
	res.sendFile(path.join(__dirname, '../../public/${page}.html'));
`
		output +=
`});`;
	output += exp;
	
	return output;
}

modelRoute = ({model, ...props}) => {
	let output = router;
	output +=
`
const {
  getAll${model},
  get${model}ById,
  create${model},
  update${model},
  delete${model}`;
	if (model === 'User' && props.userProperties.includes('login routes'))
		output +=
`,
	login,
	logout`;
	output +=
`
} = require('../../controllers/${model.toLowerCase()}-controller');

// /api/${model.toLowerCase()}
router
  .route('/')
  .get(getAll${model})
  .post(create${model});

// /api/${model.toLowerCase()}/:id
router
  .route('/:id')
  .get(get${model}ById)
  .put(update${model})
  .delete(delete${model});`;
	if (model === 'User' && props.userProperties.includes('login routes'))
		output +=
`

router
	.route('/login')
	.post(login);
	
router
	.route('/logout')
	.post(logout)`;
	output += exp;
	
	return output;
}

module.exports = {
	routesIndex,
	apiIndex,
	htmlIndex,
	pageRoute,
	modelRoute
};





































