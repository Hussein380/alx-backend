#!/usr/bin/yarn dev
import { createClient } from 'redis';

// Create Redis client
const publisher = createClient();

// Handle errors
publisher.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

// On successful connection
publisher.on('connect', () => {
  console.log('Redis client connected to the server');
});

/**
 * Function to publish a message to the channel after a delay
 * @param {string} message - The message to publish
 * @param {number} time - Delay time in milliseconds before sending the message
 */
const publishMessage = (message, time) => {
  setTimeout(() => {
    console.log(`About to send ${message}`); // Log the message about to be sent
    publisher.publish('holberton school channel', message); // Publish message to channel
  }, time); // Delay using setTimeout
};

// Call the function with different messages and delays
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
