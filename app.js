const express = require('express');
const bodyParser = require('body-parser');
const PubSubSystem = require('./driver');

const app = express();
app.use(bodyParser.json());

const pubsub = new PubSubSystem();
app.get('/notify/:topicId', (req, res) => {
    const { topicId } = req.params;
    pubsub.notify(topicId);
    res.send(`Notifying subscribers of topic ${topicId}`);
});

app.get('/unsubscribe/:topicId/:subscriberId', (req, res) => {
    const { topicId, subscriberId } = req.params;
    pubsub.unsubscribe(topicId, subscriberId);
    res.send(`Subscriber ${subscriberId} has unsubscribed from topic ${topicId}`);
});

app.get('/subscribe/:topicId/:subscriberId', (req, res) => {
    const { topicId, subscriberId } = req.params;
    pubsub.subscribe(topicId, subscriberId);
    res.send(`Subscriber ${subscriberId} has subscribed to topic ${topicId}`);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
