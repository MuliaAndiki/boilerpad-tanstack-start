import { Link, Outlet } from '@tanstack/react-router'
import { Home, LayoutDashboard, FileText, FormInput } from 'lucide-react'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { env } from '@/lib/env'

const items = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/examples/query', label: 'Query demo', icon: FileText },
  { to: '/examples/form', label: 'Form demo', icon: FormInput },
  { to: '/', label: 'Home', icon: Home },
] as const

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5 font-semibold">
            <LayoutDashboard className="size-5 shrink-0" aria-hidden />
            <span className="truncate group-data-[collapsible=icon]:hidden">
              {env.APP_NAME}
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map(({ to, label, icon: Icon }) => (
                  <SidebarMenuItem key={to}>
                    <SidebarMenuButton asChild tooltip={label}>
                      <Link
                        to={to}
                        activeOptions={{ exact: true }}
                        activeProps={{ 'data-active': true }}
                      >
                        <Icon />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger aria-label="Toggle sidebar" />
          <Separator orientation="vertical" className="h-4" />
          <h2 className="text-sm font-medium">Dashboard</h2>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
