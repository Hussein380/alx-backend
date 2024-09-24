#!/usr/bin/yarn dev

import { createClient, print } from 'redis';

// Create a Redis client
const client = createClient();

// Handle connection errors
client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

// Once the client connects, perform the operations
client.on('connect', () => {
  console.log('Redis client connected to the server');

  // Store the hash values using hset for the key 'HolbertonSchools'
  client.hset('HolbertonSchools', 'Portland', 50, print); // Portland=50
  client.hset('HolbertonSchools', 'Seattle', 80, print); // Seattle=80
  client.hset('HolbertonSchools', 'New York', 20, print); // New York=20
  client.hset('HolbertonSchools', 'Bogota', 20, print); // Bogota=20
  client.hset('HolbertonSchools', 'Cali', 40, print); // Cali=40
  client.hset('HolbertonSchools', 'Paris', 2, print); // Paris=2

  // Retrieve and display the entire hash using hgetall
  client.hgetall('HolbertonSchools', (err, result) => {
    if (err) {
      console.error('Error retrieving data from Redis:', err);
    } else {
      console.log(result); // Output the hash as an object
    }
  });
});
