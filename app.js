    const express = require('express');
    const router = express.Router();
    const request = require('request');
    var bodyParser = require('body-parser')


    router.post('/',bodyParser.text(),handleSNSMessage);
    module.exports = router;


    var handleSubscriptionResponse = function (error, response) {
        if (!error && response.statusCode == 200) {
            console.log('Yess! We have accepted the confirmation from AWS');
        }
        else {
            throw new Error(`Unable to subscribe to given URL`);
            //console.error(error)
        }
    }
    async function handleSNSMessage(req, resp, next) {

        try {
            let payloadStr = req.body
            payload = JSON.parse(payloadStr)
            console.log(JSON.stringify(payload))
            if (req.header('x-amz-sns-message-type') === 'SubscriptionConfirmation') {
                const url = payload.SubscribeURL;
                await request(url, handleSubscriptionResponse)
            } else if (req.header('x-amz-sns-message-type') === 'Notification') {
                console.log(payload)
                //process data here
            } else {
                throw new Error(`Invalid message type ${payload.Type}`);
            }
        } catch (err) {
            console.error(err)
            resp.status(500).send('Oops')
        }
        resp.send('Ok')
    }
