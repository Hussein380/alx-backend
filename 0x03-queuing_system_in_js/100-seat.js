#!/usr/bin/yarn dev
import express from 'express';
import { promisify } from 'util';
import { createQueue } from 'kue'; // Import Kue for job queue management
import { createClient } from 'redis'; // Import Redis for storage and retrieval

const app = express();
const client = createClient({ name: 'reserve_seat' }); // Create a Redis client with a name
const queue = createQueue(); // Create a Kue queue
const INITIAL_SEATS_COUNT = 50; // Initial number of seats available
let reservationEnabled = false; // Flag to enable/disable reservations
const PORT = 1245; // Port for the Express app

/**
 * Modifies the number of available seats in Redis.
 * @param {number} number - The new number of available seats.
 * @returns {Promise} - A promise that resolves when the seats are reserved.
 */
const reserveSeat = async (number) => {
  return promisify(client.SET).bind(client)('available_seats', number); // Update available seats in Redis
};

/**
 * Retrieves the current number of available seats from Redis.
 * @returns {Promise<String>} - A promise that resolves to the number of available seats.
 */
const getCurrentAvailableSeats = async () => {
  return promisify(client.GET).bind(client)('available_seats'); // Get available seats from Redis
};

// Route to get the current number of available seats
app.get('/available_seats', (_, res) => {
  getCurrentAvailableSeats()
    .then((numberOfAvailableSeats) => {
      res.json({ numberOfAvailableSeats }); // Return available seats in JSON format
    });
});

// Route to reserve a seat
app.get('/reserve_seat', (_req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservations are blocked' }); // Return error if reservations are disabled
    return;
  }

  try {
    const job = queue.create('reserve_seat'); // Create a job to reserve a seat

    // Event listener for job failure
    job.on('failed', (err) => {
      console.log(
        'Seat reservation job',
        job.id,
        'failed:',
        err.message || err.toString(),
      );
    });

    // Event listener for job completion
    job.on('complete', () => {
      console.log(
        'Seat reservation job',
        job.id,
        'completed'
      );
    });

    job.save(); // Save the job to the queue
    res.json({ status: 'Reservation in process' }); // Return reservation status
  } catch {
    res.json({ status: 'Reservation failed' }); // Return error if reservation fails
  }
});

// Route to process the reservation queue
app.get('/process', (_req, res) => {
  res.json({ status: 'Queue processing' }); // Return processing status

  // Define how to process the 'reserve_seat' jobs
  queue.process('reserve_seat', (_job, done) => {
    getCurrentAvailableSeats()
      .then((result) => Number.parseInt(result || 0)) // Parse available seats as an integer
      .then((availableSeats) => {
        reservationEnabled = availableSeats <= 1 ? false : reservationEnabled; // Disable reservations if seats are low

        if (availableSeats >= 1) {
          // If there are available seats, reserve one
          reserveSeat(availableSeats - 1)
            .then(() => done()); // Call done() to mark the job as complete
        } else {
          done(new Error('Not enough seats available')); // Handle case where no seats are available
        }
      });
  });
});

// Function to reset the number of available seats to the initial count
const resetAvailableSeats = async (initialSeatsCount) => {
  return promisify(client.SET)
    .bind(client)('available_seats', Number.parseInt(initialSeatsCount)); // Set available seats in Redis
};

// Start the Express server and initialize available seats
app.listen(PORT, () => {
  resetAvailableSeats(process.env.INITIAL_SEATS_COUNT || INITIAL_SEATS_COUNT) // Use environment variable or default
    .then(() => {
      reservationEnabled = true; // Enable reservations
      console.log(`API available on localhost port ${PORT}`); // Log server start
    });
});

export default app; // Export the app for testing
