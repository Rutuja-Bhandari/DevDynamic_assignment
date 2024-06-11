const express = require('express');
const bodyParser = require('body-parser');
const PubSubSystem = require('./driver');

const app = express();
app.use(bodyParser.json());

const pubsub = new PubSubSystem();

app.post('/subscribe', (req, res) => {
    const { topicId, subscriberId } = req.body;
    pubsub.subscribe(topicId, subscriberId);
    res.send(`Subscriber ${subscriberId} has subscribed to topic ${topicId}`);
});

app.post('/notify', (req, res) => {
    const { topicId } = req.body;
    pubsub.notify(topicId);
    res.send(`Notifying subscribers of topic ${topicId}`);
});

app.post('/unsubscribe', (req, res) => {
    const { topicId, subscriberId } = req.body;
    pubsub.unsubscribe(topicId, subscriberId);
    res.send(`Subscriber ${subscriberId} has unsubscribed from topic ${topicId}`);
});

app.get('/test', (req, res) => {
    driver(); 
    res.send('Testing the PubSubSystem');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
