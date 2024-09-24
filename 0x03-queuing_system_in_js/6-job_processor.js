#!/usr/bin/yarn dev
import { createQueue } from 'kue'; // Import the Kue module to create a queue

// Create a queue named 'push_notification_code'
const queue = createQueue();

// Function to send notifications
const sendNotification = (phoneNumber, message) => {
  // Log the notification details to the console
  console.log(
    `Sending notification to ${phoneNumber},`,
    'with message:',
    message,
  );
};

// Process jobs in the 'push_notification_code' queue
queue.process('push_notification_code', (job, done) => {
  // Call the sendNotification function with the job's data
  sendNotification(job.data.phoneNumber, job.data.message);
  
  // Mark the job as completed
  done();
});
