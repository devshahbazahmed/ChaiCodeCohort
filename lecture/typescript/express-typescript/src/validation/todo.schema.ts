import { z } from "zod";

export const todoSchema = z.object({
  id: z.string().describe("ID of the todo"),
  title: z.string().describe("title of the todo"),
  description: z.string().optional().describe("description of the todo"),
  isCompleted: z.boolean().default(false).describe("if the todo is completed"),
});

export type Todo = z.infer<typeof todoSchema>;
