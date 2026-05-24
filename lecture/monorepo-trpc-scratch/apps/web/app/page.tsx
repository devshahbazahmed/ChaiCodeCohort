'use client';
import { useState } from 'react';
import { createUserSchema } from '@monorepo-trpc-scratch/utils';
import type { SubmitEvent } from 'react';
import axios from 'axios';

export default function Home() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  async function handleSubmit(e: SubmitEvent) {
    setError('');
    setSuccess('');
    e.preventDefault();
    const result = createUserSchema.safeParse({ name, email, password });

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join(', ');

      setError(message);
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/users',
        result.data
      );

      setSuccess('User created successfully');
    } catch (error) {
      setError('Some error ocurred');
      console.log(error);
    }
  }
  return (
    <main>
      <form onSubmit={handleSubmit} noValidate={true}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
