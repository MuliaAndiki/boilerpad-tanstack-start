import { useQuery } from '@tanstack/react-query'
import { RefreshCw } from 'lucide-react'
import { EmptyState, ErrorState } from '@/components/common/query-states'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { postsQueryOptions } from '../queries/posts.queries'

export function PostsTable({ compact = false }: { compact?: boolean }) {
  const { data, isPending, isError, error, refetch, isFetching } =
    useQuery(postsQueryOptions())

  if (isPending) {
    return (
      <div className="space-y-2" aria-busy="true" aria-label="Loading posts">
        {Array.from({ length: compact ? 4 : 6 }, (_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    )
  }

  if (isError) return <ErrorState error={error} onRetry={() => refetch()} />
  if (data.length === 0)
    return <EmptyState title="No posts yet" description="Nothing to show." />

  const rows = compact ? data.slice(0, 5) : data

  return (
    <div className="space-y-3">
      {!compact && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw className={isFetching ? 'animate-spin' : undefined} />
            Refetch
          </Button>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-24 text-right">Author</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-mono text-muted-foreground">
                {post.id}
              </TableCell>
              <TableCell className="max-w-xs truncate font-medium">
                {post.title}
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="secondary">User {post.userId}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
