import { getAuthQueryOptions } from '@/hooks/auth.hooks'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/_auth')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(
      getAuthQueryOptions()
    )
    if (!user) {
      throw redirect({
        to: '/',
        replace: true,
        search: {
          login: 'required',
          redirect: location.href,
        },
      })
    }
    return { user }
  },
})
