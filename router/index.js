let WebhooksApi = require('@octokit/webhooks');
let webhooks = new WebhooksApi({
  secret: process.env.TEST_GITHUB_TOKEN
});

let bodyParser = require('body-parser');
let express = require('express');

let host = process.env.HOST || 'localhost';
let port = process.env.PORT || '3000';

let app = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/', (req, res) => {
	let payload = req.body;

	let pullRequestEditedOrOpened = payload['pull_request'] && (payload.action === 'opened' || payload.action === 'edited');
	
	if (pullRequestEditedOrOpened) {
		
	}
	
	res.sendStatus(200);
	res.end();
});

app.listen(port, host, function(err) {
    if (err) {
		console.log(err);
    }

    console.info(`Server listening at http://${host}:${port}`);
});
