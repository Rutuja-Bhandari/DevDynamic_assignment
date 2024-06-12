const express = require('express');
const app = express();
let topics = {};

class PubSubscription {
    constructor() {
        this.topics = {};
    }

    subscribe(topicId, subscriberId) {
        //To check whether the string is empty or not
        if (topicId === '' || subscriberId === '') {
            console.log(' Topic id or subscriber id is empty');
            return;
        }
        if (!this.topics[topicId]) {
            this.topics[topicId] = new Set();
        }
        //To check if the user is already subscribed or not
        if (this.topics[topicId].has(subscriberId)) {
            console.log(`Subscriber ${subscriberId} is already subscribed to topic ${topicId}`);
        } else {
            this.topics[topicId].add(subscriberId);
            console.log(`Subscriber ${subscriberId} has subscribed to topic ${topicId}`);
        }
    }

   
    
    
    notify(topicId) {
        // To check if topic id is empty or not a string
        if (!topicId || typeof topicId !== 'string') {
            console.log(' Invalid or empty topicId.');
            return;
        }
        // Check whether it has subscriber or not
        if (this.topics[topicId]) {
            if (this.topics[topicId].size === 0) {
                console.log(`No subscribers to notify for topic ${topicId}`);
                return;
            }
    
            this.topics[topicId].forEach(subscriber => {
                console.log(`Notifying subscriber ${subscriber} about topic ${topicId}`);
            });
        } else {
            console.log(`No subscribers to notify for topic ${topicId}`);
        }
    }

    unsubscribe(topicId, subscriberId) {
        // Check if topicId or subscriberId is empty or invalid
        if (!topicId.trim() || !subscriberId.trim()) {
            console.log(' Topic id or subscriber id is empty');
            return;
        }
    
        // Check if the topicId exists in topics
        if (!this.topics[topicId]) {
            console.log(` Topic ${topicId} does not exist`);
            return;
        }
    
        // Check if the subscriberId is subscribed to the topic
        if (this.topics[topicId].has(subscriberId)) {
            this.topics[topicId].delete(subscriberId);
            console.log(`Subscriber ${subscriberId} has unsubscribed from topic ${topicId}`);
        } else {
            console.log(`Subscriber ${subscriberId} is not subscribed to topic ${topicId}`);
        }
    }

}

function driver() {
    const pubsub = new PubSubscription();
    
    // Subscribers subscribing to topics
    console.log("************ Subscription cases ************\n");
    pubsub.subscribe("topic_1", "subscriber_1"); 
    pubsub.subscribe("topic_2", "subscriber_2");
    pubsub.subscribe("topic_2", "subscriber_3");
    console.log("\nSubscription edge cases");
    pubsub.subscribe("", "subscriber_1"); // Empty topicId
    pubsub.subscribe("topic_1", ""); // Empty subscriberId
    pubsub.subscribe("topic_1", "subscriber_1"); // Subscriber already subscribed
    
    // Notify subscribers of a topic
    console.log("\n************ Notification cases ************\n");
    pubsub.notify("topic_1");
    pubsub.notify("topic_2");
    console.log("\nNotification edge cases");
    pubsub.notify(""); // Empty topicId
    pubsub.notify("topic_3"); // Non-existent topic
    
    // Unsubscribing from topics
    console.log("\n************ UnSubscription cases ************\n");
    pubsub.unsubscribe("topic_2", "subscriber_3");
    console.log("\nUnsubscription edge cases");
    pubsub.unsubscribe("", "subscriber_1"); // Empty topicId
    pubsub.unsubscribe("topic_1", ""); // Empty subscriberId
    pubsub.unsubscribe("topic_3", "subscriber_1"); // Non-existent topic
    pubsub.unsubscribe("topic_1", "subscriber_5"); // Non-existent subscriber
    
}

driver();



module.exports = PubSubscription;