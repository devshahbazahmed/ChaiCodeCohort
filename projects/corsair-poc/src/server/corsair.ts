import 'dotenv/config';
import Database from 'better-sqlite3';
import { createCorsair } from 'corsair';
import { github } from '@corsair-dev/github';
import { gmail } from '@corsair-dev/gmail';
import { slack } from '@corsair-dev/slack';

const db = new Database('corsair.db');

export const corsair = createCorsair({
  plugins: [github(), gmail(), slack()],
  database: db,
  kek: process.env.CORSAIR_KEK!,
});

// corsair.github.api.pullRequests.list();
// corsair.gmail.api.messages.list();
