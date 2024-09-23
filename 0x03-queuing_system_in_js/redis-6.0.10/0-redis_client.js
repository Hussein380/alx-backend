#!/usr/bin/yarn dev

import { createClient } from 'redis';  // Correct the import

const client = createClient();  // Correct the function name

// Event listener for successful connection
client.on('connect', () => {  // Fix the typo in 'connect'
    console.log('Redis client connected to the server');
});

// Event listener for errors
client.on('error', (err) => {  // Correct the syntax for the error handler
    console.error('Redis client not connected to the server:', err.toString());  // Fix console.err to console.error
});
