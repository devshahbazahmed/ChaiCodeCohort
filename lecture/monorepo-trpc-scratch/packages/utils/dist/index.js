import { z } from 'zod';
export const createUserSchema = z.object({
    name: z
        .string()
        .min(3, 'Name must be atleast 3 characters')
        .describe('Name of the user'),
    email: z.email('Invalid email address').describe('Email of the user'),
    password: z
        .string()
        .min(8, 'Password must be atleast 8 characters')
        .describe('Password of the user'),
});
//# sourceMappingURL=index.js.map