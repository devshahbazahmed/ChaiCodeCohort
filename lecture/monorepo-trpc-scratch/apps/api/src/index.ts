import express from 'express';
import { createUserSchema } from '@monorepo-trpc-scratch/utils';

const app = express();

app.get('/', (req, res) => {
  return res.json({
    message: 'Hello peers',
  });
});

app.post('/users', (req, res) => {
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(', ');
    return res.status(400).json({
      success: false,
      message: message,
    });
  }

  console.log(result.data);

  return res.json({
    success: true,
    message: 'User created ',
  });
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
