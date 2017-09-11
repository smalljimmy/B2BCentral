const express = require('express');
const livereload = require('livereload');
const path = require('path');
const app = express();
const port = 3000;

const staticDirectory = `${__dirname}/../build/webapps/HorizonteWebApp/js/`;

const livereloadServer = livereload.createServer({port: 3001});
livereloadServer.watch(staticDirectory);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.get('/b2bcentral/static/:file', (req, res) => {
  res.sendFile(path.resolve(`${staticDirectory}${req.params.file}`));
});

app.get('/b2bcentral/proxy/queryData/:query', (req, res) => {
	  res.sendFile(path.resolve(`${__dirname}/mock_responses/${req.params.query}.json`));
});

app.listen(port, function () {
  console.log(`Dev server istening on port ${port}!`);
});