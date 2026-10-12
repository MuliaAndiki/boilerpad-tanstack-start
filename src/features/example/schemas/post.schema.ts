import { z } from 'zod'

export const postSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string(),
})

export const createPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  body: z.string().min(10, 'Body must be at least 10 characters').max(500),
  userId: z.number().int().positive(),
})

export type Post = z.infer<typeof postSchema>
export type CreatePostInput = z.infer<typeof createPostSchema>
