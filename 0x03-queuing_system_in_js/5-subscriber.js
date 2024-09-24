#!/usr/bin/yarn dev
import { createClient } from 'redis';

// Create Redis client
const subscriber = createClient();

// Handle errors
subscriber.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

// On successful connection
subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Subscribe to the 'holberton school channel'
subscriber.subscribe('holberton school channel');

// Listen for messages on the channel
subscriber.on('message', (_err, message) => {
  console.log(message); // Log the message

  // If message is KILL_SERVER, unsubscribe and quit
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
  }
});
