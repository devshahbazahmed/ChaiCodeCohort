import { Worker } from "bullmq";
import { notificationQueue, QueueMap } from "./queue.js";
import { redisConnection } from "../connection.js";

const wait = (s) => new Promise((res) => setTimeout(res, s * 1000));

export const videoProcessingWorker = new Worker(QueueMap["VIDEO_PROCESSING_QUEUE"], async (job) => {
  console.log(`Processing job`, job.id);
  console.log(`Transcoding job`, { url: job.data });

  await wait(10);

  console.log(`Transcoding job Done....`, { url: job.data });

  await notificationQueue.add(`notification-${job.data.videoURL}`, {
    notification: `Video has been processed for ${job.data.videoURL}`
  });

  return true;
}, { autorun: false, connection: redisConnection });

export const notificationWorker = new Worker(QueueMap["NOTIFICATION_QUEUE"], async (job) => {
  console.log(`Sending notification to ${job.data.notification}`);
}, {
  autorun: false,
  concurrency: 1,
  limiter: {
    max: 1,
    duration: 10 * 1000,
  }
});