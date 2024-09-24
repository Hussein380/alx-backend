#!/usr/bin/yarn dev

import { createClient, print } from 'redis';

const client = createClient();

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
  
  // Call your functions after the client is connected
  runOperations();
});

const setNewSchool = (schoolName, value) => {
  client.SET(schoolName, value, print); // Set key-value pair in Redis
};

const displaySchoolValue = (schoolName) => {
  client.GET(schoolName, (_err, reply) => {
    console.log(reply); // Retrieve and display value
  });
};

const runOperations = async () => {
  // Use async/await to ensure operations are completed
  await displaySchoolValue('Holberton'); // Retrieves value for 'Holberton'
  await setNewSchool('HolbertonSanFrancisco', '100'); // Sets 'HolbertonSanFrancisco' to '100'
  await displaySchoolValue('HolbertonSanFrancisco'); // Retrieves value for 'HolbertonSanFrancisco'

  await client.quit(); // Close the client when done
};

// Start the connection
client.connect();
