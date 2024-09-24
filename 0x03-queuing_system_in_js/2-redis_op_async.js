#!/usr/bin/yarn dev

// Importing necessary modules
import { promisify } from 'util'; // 'promisify' is used to convert callback-based functions to promise-based ones
import { createClient, print } from 'redis'; // 'createClient' initializes Redis, and 'print' is used for printing Redis responses

// Creating a Redis client
const client = createClient();

// Handling connection errors
client.on('error', (err) => {
  // This callback is triggered when there's an error in connecting to Redis
  console.log('Redis client not connected to the server:', err.toString());
});

// Function to set a new key-value pair in Redis
const setNewSchool = (schoolName, value) => {
  // This function sets the key `schoolName` with the value `value` in Redis
  // The `print` function is used as a callback to display confirmation that the value was set
  client.SET(schoolName, value, print);
};

// Async function to retrieve and display a value from Redis
const displaySchoolValue = async (schoolName) => {
  // This uses `promisify` to convert the `GET` operation to a promise-based function
  // `await` waits for the value to be retrieved from Redis, then logs the result
  console.log(await promisify(client.GET).bind(client)(schoolName));
};

// Main async function to coordinate the operations
async function main() {
  // Display the value for the key 'Holberton' (expected to be `null` if not set)
  await displaySchoolValue('Holberton');

  // Set the value '100' for the key 'HolbertonSanFrancisco'
  setNewSchool('HolbertonSanFrancisco', '100');

  // Display the value for the key 'HolbertonSanFrancisco' (should now be '100')
  await displaySchoolValue('HolbertonSanFrancisco');
}

// Handling successful connection to the Redis server
client.on('connect', async () => {
  // This callback is triggered when the Redis client connects successfully
  console.log('Redis client connected to the server');

  // Call the `main` function to execute the Redis operations
  await main();
});
