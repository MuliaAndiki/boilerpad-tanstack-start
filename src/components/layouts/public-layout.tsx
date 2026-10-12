import { Link } from '@tanstack/react-router'
import { LayoutDashboard } from 'lucide-react'
import type { ReactNode } from 'react'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { Button } from '@/components/ui/button'
import { env } from '@/lib/env'

const navItems = [
  { to: '/examples/query', label: 'Query' },
  { to: '/examples/form', label: 'Form' },
] as const

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <LayoutDashboard className="size-5" aria-hidden />
            {env.APP_NAME}
          </Link>
          <nav aria-label="Main" className="flex items-center gap-1">
            {navItems.map((item) => (
              <Button key={item.to} variant="ghost" size="sm" asChild>
                <Link to={item.to} activeProps={{ className: 'bg-accent' }}>
                  {item.label}
                </Link>
              </Button>
            ))}
            <Button size="sm" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        {children}
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        {env.APP_NAME} &middot; {env.APP_ENV}
      </footer>
    </div>
  )
}
