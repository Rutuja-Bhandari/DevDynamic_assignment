const express = require('express');
const bodyParser = require('body-parser');
const PubSubSystem = require('./driver');

const app = express();
app.use(bodyParser.json());

const pubsub = new PubSubSystem();
app.get('/notify/:topicId', (req, res) => {
    let { topicId } = req.params;
    topicId = topicId.trim(); 
    if (!topicId) {
        return res.status(400).send('Empty topicId is not allowed.');
    }

    // Check if the topic exists
    if (!pubsub.topics[topicId]) {
        return res.status(404).send(`Topic ${topicId} does not exist.`);
    }

    pubsub.notify(topicId);
    res.send(`Notifying subscribers of topic ${topicId}`);
});

app.get('/unsubscribe/:topicId/:subscriberId', (req, res) => {
    let { topicId, subscriberId } = req.params;
    topicId = topicId.trim(); // Remove leading and trailing whitespace
    subscriberId = subscriberId.trim();
    if (!topicId || !subscriberId) {
        return res.status(400).send('Empty topicId or subscriberId is not allowed.');
    }

    // Check if the topic exists
    if (!pubsub.topics[topicId]) {
        return res.status(404).send(`Topic ${topicId} does not exist.`);
    }

    // Check if the subscriber is subscribed to the topic
    if (!pubsub.topics[topicId].has(subscriberId)) {
        return res.status(404).send(`Subscriber ${subscriberId} is not subscribed to topic ${topicId}`);
    }

    // Unsubscribe the subscriber from the topic
    pubsub.unsubscribe(topicId, subscriberId);
    res.send(`Subscriber ${subscriberId} has unsubscribed from topic ${topicId}`);
});

app.get('/subscribe/:topicId/:subscriberId', (req, res) => {
    let { topicId, subscriberId } = req.params;
    topicId = topicId.trim(); // Remove leading and trailing whitespace
    subscriberId = subscriberId.trim();
    if (!topicId || !subscriberId) {
        return res.status(400).send('Empty topicId or subscriberId is not allowed.');
    }

    // Check if the subscriber is already subscribed to the topic
    if (pubsub.topics[topicId] && pubsub.topics[topicId].has(subscriberId)) {
        return res.status(400).send(`Subscriber ${subscriberId} is already subscribed to topic ${topicId}`);
    }

    // Subscribe the subscriber to the topic
    pubsub.subscribe(topicId, subscriberId);
    res.send(`Subscriber ${subscriberId} has subscribed to topic ${topicId}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
