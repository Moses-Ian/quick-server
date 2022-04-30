const head =  
`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<link rel="stylesheet" href="./assets/css/style.css" />`;

const manifest =
`
		<link rel="manifest" href="manifest.json">`;
		
const html = (name) =>
`	
    <title>${name}</title>
  </head>
  <body>
    <h1>${name}</h1>

    <!-- Optional JavaScript -->
		<script src="./assets/js/script.js"></script>`;
		
const handlebars = (name) =>
`
		<title>${name}</title>
	</head>

	<body>
		<div class="wrapper">
			<header>
				<h1>
					<a href="/">${name}</a>
				</h1>
			</header>
			<main>
				{{{ body }}}
			</main>
			<footer>
				Thanks for visiting!
			</footer>
		</div>

		<script src="./assets/js/script.js"></script>`;

const idb =
`
		<script src="./assets/js/idb.js"></script>`;
		
const endBody =
`
  </body>`;

const serviceWorker = 
`

	<script>
	(function() {
		if("serviceWorker" in navigator) {
			navigator.serviceWorker.register("./service-worker.js")
				.then(() => console.log("Service Worker registered successfully."))
				.catch(error => console.log("Service Worker registration failed:", error));
		}
	})();
	</script>
`;

const endTag =
`
</html>`;

module.exports = {
	head,
	manifest,
	html,
	handlebars,
	endBody,
	endTag,
	idb,
	serviceWorker
}