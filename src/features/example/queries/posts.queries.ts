import { queryOptions } from '@tanstack/react-query'
import { postsService } from '../services/posts.service'

export const postKeys = {
  all: ['posts'] as const,
  list: () => [...postKeys.all, 'list'] as const,
}

export const postsQueryOptions = () =>
  queryOptions({
    queryKey: postKeys.list(),
    queryFn: ({ signal }) => postsService.list(signal),
    staleTime: 60_000,
  })
