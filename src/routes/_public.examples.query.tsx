import { createFileRoute } from '@tanstack/react-router'
import { PostsTable } from '@/features/example/components/posts-table'

export const Route = createFileRoute('/_public/examples/query')({
  head: () => ({ meta: [{ title: 'Query example' }] }),
  component: QueryExample,
})

function QueryExample() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          TanStack Query
        </h1>
        <p className="text-muted-foreground">
          Fetches from the public JSONPlaceholder API. Shows loading, error,
          empty and data states.
        </p>
      </header>
      <PostsTable />
    </div>
  )
}
