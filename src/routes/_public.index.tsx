import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Cloud, Database, Palette, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const Route = createFileRoute('/_public/')({
  head: () => ({ meta: [{ title: 'Home' }] }),
  component: Home,
})

const features = [
  {
    icon: Cloud,
    title: 'Cloudflare Workers',
    text: 'SSR on the edge with separate staging and production Workers.',
  },
  {
    icon: Database,
    title: 'TanStack Query',
    text: 'Per-request QueryClient with SSR hydration and typed query options.',
  },
  {
    icon: Palette,
    title: 'shadcn/ui',
    text: 'Accessible components with light and dark themes via CSS variables.',
  },
  {
    icon: ShieldCheck,
    title: 'Strict TypeScript',
    text: 'Typed routes, typed API client, Zod-validated forms.',
  },
]

function Home() {
  return (
    <div className="space-y-16">
      <section className="flex flex-col items-center gap-6 py-10 text-center">
        <Badge variant="secondary">
          TanStack Start &middot; Vite &middot; Workers
        </Badge>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          A frontend boilerplate ready for your next product
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Opinionated yet minimal foundation for SaaS apps and dashboards backed
          by an external REST API.
        </p>
        <div className="flex gap-3">
          <Button asChild size="lg">
            <Link to="/dashboard">
              Open dashboard <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/examples/query">Query example</Link>
          </Button>
        </div>
      </section>
      <section aria-label="Features" className="grid gap-4 sm:grid-cols-2">
        {features.map(({ icon: Icon, title, text }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="mb-2 size-6" aria-hidden />
              <CardTitle>{title}</CardTitle>
              <CardDescription>{text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  )
}
