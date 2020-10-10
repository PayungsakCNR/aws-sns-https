const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/aws-budget', (req, res) => {
	let body = ''
	req.on('data', (chunk) => {
    		body += chunk.toString()
  	})
	req.on('end', () => {
		let payload = JSON.parse(body)
		console.log(payload);
	})
	//res.send('ok');
});

const port = process.env.PORT || 3091
app.listen(port, () => console.log(`Listening on port${port}...`) );
