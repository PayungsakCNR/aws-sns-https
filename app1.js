const express = require('express')
const request = require('request')
// parse urlencoded request bodies into req.body
const bodyParser = require('body-parser')
const app = express()
const port = 3091

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/aws-budget', (req, res) => {
  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    let payload = JSON.parse(body)

    if (payload.Type === 'SubscriptionConfirmation') {
      const promise = new Promise((resolve, reject) => {
        const url = payload.SubscribeURL

        request(url, (error, response) => {
          if (!error && response.statusCode == 200) {
            console.log('Yess! We have accepted the confirmation from AWS')
            console.log(payload);
            return resolve()
          } else {
            return reject()
          }
        })
      })

      promise.then(() => {
        res.end("ok")
      })
    }
  })
})

app.listen(port, () => console.log('Example app listening on port ' + port + '!'))
