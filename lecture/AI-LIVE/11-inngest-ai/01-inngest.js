import { inngest } from './inngest-client.js';

export const onOrderPlaced = inngest.createFunction(
  {
    id: 'chai-on-order-placed',
    retries: 2,
    triggers: [{ event: 'chai.order.placed' }],
  },
  async ({ event, step }) => {
    const { orderId, customer } = event.data;

    const greeting = await step.run('greet', async () => {
      return `Hello, ${customer.name}! Your order ${orderId} has been received.`;
    });

    await step.run('log', async () => {
      console.log(greeting);
    });
    return { success: true, greeting };
  }
);
