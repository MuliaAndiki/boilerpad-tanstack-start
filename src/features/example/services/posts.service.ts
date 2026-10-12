import { api } from '@/lib/api'
import type { CreatePostInput, Post } from '../schemas/post.schema'

export const postsService = {
  list: (signal?: AbortSignal) =>
    api.get<Post[]>('/posts', { query: { _limit: 10 }, signal }),
  create: (input: CreatePostInput) => api.post<Post>('/posts', input),
}
