#!/usr/bin/yarn dev
import { createQueue, Job } from 'kue';

// Array of blacklisted phone numbers
const BLACKLISTED_NUMBERS = ['4153518780', '4153518781'];

// Create a new Kue queue
const queue = createQueue();

/**
 * Sends a push notification to a user.
 * @param {String} phoneNumber - The phone number to send the notification to
 * @param {String} message - The message to be sent
 * @param {Job} job - The Kue job instance for tracking progress and completion
 * @param {*} done - Callback to signal that the job is complete or failed
 */
const sendNotification = (phoneNumber, message, job, done) => {
  // Total number of attempts and pending attempts
  let total = 2, pending = 2;

  // Set up an interval to simulate sending the notification
  let sendInterval = setInterval(() => {
    // Update the job progress to half when the pending count reaches half of the total
    if (total - pending <= total / 2) {
      job.progress(total - pending, total);
    }

    // Check if the phone number is blacklisted
    if (BLACKLISTED_NUMBERS.includes(phoneNumber)) {
      done(new Error(`Phone number ${phoneNumber} is blacklisted`)); // Signal error if blacklisted
      clearInterval(sendInterval); // Clear the interval
      return; // Exit the function
    }

    // Log the notification sending process
    if (total === pending) {
      console.log(
        `Sending notification to ${phoneNumber},`,
        `with message: ${message}`
      );
    }

    // Decrement the pending count and check if it reaches zero
    --pending || done(); // Call done if pending reaches zero
    pending || clearInterval(sendInterval); // Clear the interval if no pending jobs
  }, 1000); // Set interval to 1000ms (1 second)
};

// Process jobs in the queue with a concurrency of 2
queue.process('push_notification_code_2', 2, (job, done) => {
  // Call sendNotification with job data
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
