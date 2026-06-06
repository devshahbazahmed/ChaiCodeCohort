import { Inngest } from 'inngest';
import { openaiResponses } from '@inngest/ai/models';

export const inngest = new Inngest({
  id: 'chaicode-inngest',
});

export const gpt4omini = openaiResponses({
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
});
