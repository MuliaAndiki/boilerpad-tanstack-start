import { useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { getErrorMessage } from '@/lib/api'

export function ErrorFallback({
  error,
  reset,
}: {
  error: unknown
  reset: () => void
}) {
  const router = useRouter()
  return (
    <main
      role="alert"
      className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center"
    >
      <h1 className="text-2xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="max-w-md text-muted-foreground">{getErrorMessage(error)}</p>
      <Button
        onClick={() => {
          reset()
          router.invalidate()
        }}
      >
        Try again
      </Button>
    </main>
  )
}
