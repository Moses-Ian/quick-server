const html = (name) => 
`<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<link rel="stylesheet" href="./assets/css/style.css" />
	
    <title>${name}</title>
  </head>
  <body>
    <h1>${name}</h1>

    <!-- Optional JavaScript -->
		<script src="./assets/js/script.js"></script>		
  </body>
</html>`;

const handlebars = (name) =>
`<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name}</title>
  <link rel="stylesheet" href="/stylesheets/style.css">
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

</body>

</html>`;

module.exports = {
	html,
	handlebars
}