import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postKeys } from '../queries/posts.queries'
import { postsService } from '../services/posts.service'

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postsService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: postKeys.all }),
  })
}
