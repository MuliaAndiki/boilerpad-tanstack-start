import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { FileText, Plus, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreatePostForm } from '@/features/example/components/create-post-form'
import { PostsTable } from '@/features/example/components/posts-table'
import { postsQueryOptions } from '@/features/example/queries/posts.queries'

export const Route = createFileRoute('/dashboard/')({ component: Overview })

function Overview() {
  const { data, isPending } = useQuery(postsQueryOptions())
  const authors = data ? new Set(data.map((p) => p.userId)).size : 0

  const stats = [
    { label: 'Total posts', value: data?.length, icon: FileText },
    { label: 'Authors', value: authors, icon: Users },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">
            A sample dashboard to validate layout and components.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus /> New post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New post</DialogTitle>
              <DialogDescription>
                Validated with Zod, submitted with a mutation.
              </DialogDescription>
            </DialogHeader>
            <CreatePostForm />
          </DialogContent>
        </Dialog>
      </div>

      <section
        aria-label="Stats"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardDescription>{label}</CardDescription>
              <Icon className="size-4 text-muted-foreground" aria-hidden />
            </CardHeader>
            <CardContent>
              {isPending ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-semibold">{value}</p>
              )}
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardDescription>API status</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={isPending ? 'secondary' : 'default'}>
              {isPending ? 'Checking…' : 'Online'}
            </Badge>
          </CardContent>
        </Card>
      </section>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="all">All posts</TabsTrigger>
        </TabsList>
        <Card className="mt-2">
          <CardContent>
            <TabsContent value="recent">
              <PostsTable compact />
            </TabsContent>
            <TabsContent value="all">
              <PostsTable />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}
