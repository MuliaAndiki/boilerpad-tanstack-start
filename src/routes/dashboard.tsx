import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '@/components/layouts/dashboard-layout'

// Authenticated area: data comes from the client via TanStack Query, so skip SSR.
export const Route = createFileRoute('/dashboard')({
  ssr: false,
  head: () => ({ meta: [{ title: 'Dashboard' }] }),
  component: DashboardLayout,
})
