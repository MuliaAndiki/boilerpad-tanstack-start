import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CreatePostForm } from '@/features/example/components/create-post-form'

export const Route = createFileRoute('/_public/examples/form')({
  head: () => ({ meta: [{ title: 'Form example' }] }),
  component: FormExample,
})

function FormExample() {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Form</h1>
        <p className="text-muted-foreground">
          React Hook Form + Zod + shadcn/ui, with a TanStack Query mutation.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Create post</CardTitle>
          <CardDescription>
            Submits to the fake POST /posts endpoint.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreatePostForm />
        </CardContent>
      </Card>
    </div>
  )
}
