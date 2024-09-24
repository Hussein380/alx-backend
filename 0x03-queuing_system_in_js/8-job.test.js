#!/usr/bin/yarn test
import sinon from 'sinon';
import { expect } from 'chai';
import { createQueue } from 'kue';
import createPushNotificationsJobs from './8-job.js';

// Describe the test suite for createPushNotificationsJobs
describe('createPushNotificationsJobs', () => {
  const BIG_BROTHER = sinon.spy(console); // Spy on console.log
  const QUEUE = createQueue({ name: 'push_notification_code_test' }); // Create a test queue

  before(() => {
    QUEUE.testMode.enter(true); // Enter test mode for the queue
  });

  after(() => {
    QUEUE.testMode.clear(); // Clear test jobs
    QUEUE.testMode.exit(); // Exit test mode
  });

  afterEach(() => {
    BIG_BROTHER.log.resetHistory(); // Reset the spy history after each test
  });

  // Test case for error when jobs is not an array
  it('displays an error message if jobs is not an array', () => {
    expect(
      createPushNotificationsJobs.bind(createPushNotificationsJobs, {}, QUEUE)
    ).to.throw('Jobs is not an array'); // Expect an error to be thrown
  });

  // Test case for adding jobs to the queue
  it('adds jobs to the queue with the correct type', (done) => {
    expect(QUEUE.testMode.jobs.length).to.equal(0); // Check initial job count
    const jobInfos = [
      {
        phoneNumber: '44556677889',
        message: 'Use the code 1982 to verify your account',
      },
      {
        phoneNumber: '98877665544',
        message: 'Use the code 1738 to verify your account',
      },
    ];
    createPushNotificationsJobs(jobInfos, QUEUE); // Call the function to create jobs
    expect(QUEUE.testMode.jobs.length).to.equal(2); // Check if two jobs are added
    expect(QUEUE.testMode.jobs[0].data).to.deep.equal(jobInfos[0]); // Check job data
    expect(QUEUE.testMode.jobs[0].type).to.equal('push_notification_code_3'); // Check job type
    QUEUE.process('push_notification_code_3', () => {
      expect(
        BIG_BROTHER.log
          .calledWith('Notification job created:', QUEUE.testMode.jobs[0].id)
      ).to.be.true; // Check if the log was called
      done();
    });
  });

  // Test case for the progress event
  it('registers the progress event handler for a job', (done) => {
    QUEUE.testMode.jobs[0].addListener('progress', () => {
      expect(
        BIG_BROTHER.log
          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, '25% complete')
      ).to.be.true; // Check if the log for progress is called
      done();
    });
    QUEUE.testMode.jobs[0].emit('progress', 25); // Emit the progress event
  });

  // Test case for the failed event
  it('registers the failed event handler for a job', (done) => {
    QUEUE.testMode.jobs[0].addListener('failed', () => {
      expect(
        BIG_BROTHER.log
          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, 'failed:', 'Failed to send')
      ).to.be.true; // Check if the log for failure is called
      done();
    });
    QUEUE.testMode.jobs[0].emit('failed', new Error('Failed to send')); // Emit the failed event
  });

  // Test case for the complete event
  it('registers the complete event handler for a job', (done) => {
    QUEUE.testMode.jobs[0].addListener('complete', () => {
      expect(
        BIG_BROTHER.log
          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, 'completed')
      ).to.be.true; // Check if the log for completion is called
      done();
    });
    QUEUE.testMode.jobs[0].emit('complete'); // Emit the complete event
  });
});
