const fs = require('fs');

const callback = err => {
	if (err)
		console.error(err);
}

const writeFile = (dest, fileContent) => {
	fs.writeFile(dest, fileContent, callback)
};

const copyFile = (src, dest) => {
	fs.copyFile(src, dest, callback)
};

const appendFile = (dest, fileContent) => {
	fs.appendFile(dest, fileContent, callback)
};

const readThenWrite = (src, dest, fileContent) => {
	fs.readFile(src, {encoding: 'UTF-8'}, (err, data) => fs.writeFile(dest, data.concat(fileContent), callback))
};

module.exports = { writeFile, copyFile, appendFile, readThenWrite };