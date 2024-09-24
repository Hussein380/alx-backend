// create Queue
import { createQueue } from 'kue';
const queue = createQueue({ name: 'push_notification_code' });

// create job
const job = queue.create('push_notification_code', {
  phoneNumber: '07045679939',
  message: 'Account registered',
});

job.on('enqueue', () => {
  console.log('Notification job created:', job.id);
});

job.on('complete', () => {
  console.log('Notification job completed');
});

job.on('failed attempt', () => {
  console.log('Notification job failed');
});

job.save();

