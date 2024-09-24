#!/usr/bin/yarn dev
import { createQueue } from 'kue';  // Import the createQueue function from Kue

// Create an array of job data with phone numbers and messages
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account',
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account',
  },
];

// Create a Kue queue named 'push_notification_code_2'
const queue = createQueue({ name: 'push_notification_code_2' });

// Loop through the jobs array to create jobs in the queue
for (const jobInfo of jobs) {
  // Create a job for each object in the jobs array
  const job = queue.create('push_notification_code_2', jobInfo);

  // Event listener for when the job is added to the queue
  job.on('enqueue', () => {
    console.log('Notification job created:', job.id);
  })
  // Event listener for when the job is completed
  .on('complete', () => {
    console.log('Notification job', job.id, 'completed');
  })
  // Event listener for when the job fails
  .on('failed', (err) => {
    console.log('Notification job', job.id, 'failed:', err.message || err.toString());
  })
  // Event listener for tracking job progress
  .on('progress', (progress, _data) => {
    console.log('Notification job', job.id, `${progress}% complete`);
  });
  
  // Save the job to the queue
  job.save();
}
