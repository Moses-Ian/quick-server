const indexedDB = (name, obj) =>
`let db;
const request = indexedDB.open('${name}', 1);

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  db.createObjectStore('${obj}', { autoIncrement: true });
};

request.onsuccess = function(event) {
  db = event.target.result;

  if (navigator.onLine) {
    ${obj}Upload();
  }
};

request.onerror = function(event) {
  console.log(event.target.errorCode);
};

function saveRecord(record) {
  const ${obj} = db.transaction(['${obj}'], 'readwrite');

  const ${obj}ObjectStore = ${obj}.objectStore('${obj}');

  ${obj}ObjectStore.add(record);
}

function ${obj}Upload() {
  const ${obj} = db.transaction(['${obj}'], 'readwrite');

  const ${obj}ObjectStore = ${obj}.objectStore('${obj}');

  const getAll = ${obj}ObjectStore.getAll();

	getAll.onsuccess = function() {
			if (getAll.result.length > 0) {
				fetch('/api/${obj}', {
					method: 'POST',
					body: JSON.stringify(getAll.result),
					headers: {
						Accept: 'application/json, text/plain, */*',
						'Content-Type': 'application/json'
					}
				})
					.then(response => response.json())
					.then(serverResponse => {
						if (serverResponse.message) {
							throw new Error(serverResponse);
						}
						const ${obj} = db.transaction(['${obj}'], 'readwrite');
						const ${obj}ObjectStore = ${obj}.objectStore('${obj}');
						${obj}ObjectStore.clear();

						alert('All saved ${obj}s have been submitted!');
					})
					.catch(err => {
						console.log(err);
					});
			}
		};
}

window.addEventListener('online', ${obj}Upload);`;

module.exports = indexedDB;