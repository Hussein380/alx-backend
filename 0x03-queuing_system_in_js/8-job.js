#!/usr/bin/yarn dev
import { Queue, Job } from 'kue';

/**
 * Creates push notification jobs from the array of jobs info.
 * @param {Job[]} jobs - An array of job objects containing phone numbers and messages
 * @param {Queue} queue - The Kue queue to which jobs will be added
 */
export const createPushNotificationsJobs = (jobs, queue) => {
  // Check if jobs is an array
  if (!(jobs instanceof Array)) {
    throw new Error('Jobs is not an array'); // Throw an error if jobs is not an array
  }

  // Loop through each job information object in the jobs array
  for (const jobInfo of jobs) {
    // Create a new job in the queue with the type 'push_notification_code_3'
    const job = queue.create('push_notification_code_3', jobInfo);

    // Attach event handlers for the job's lifecycle
    job
      .on('enqueue', () => {
        console.log('Notification job created:', job.id); // Log when the job is created
      })
      .on('complete', () => {
        console.log('Notification job', job.id, 'completed'); // Log when the job is completed
      })
      .on('failed', (err) => {
        console.log('Notification job', job.id, 'failed:', err.message || err.toString()); // Log when the job fails
      })
      .on('progress', (progress, _data) => {
        console.log('Notification job', job.id, `${progress}% complete`); // Log job progress
      });
    
    // Save the job to the queue
    job.save();
  }
};

// Export the function as the default export
export default createPushNotificationsJobs;
