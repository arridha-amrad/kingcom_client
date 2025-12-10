import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'

import type { QueryClient } from '@tanstack/react-query'

import ThemeProvider from '@/components/Providers/ThemeProvider.tsx'
import { Toaster } from 'react-hot-toast'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <HeadContent />
      <div className="container mx-auto">
        <ThemeProvider>
          <Outlet />
          <Toaster position="bottom-center" />
        </ThemeProvider>
        <TanStackRouterDevtools />
        <TanStackQueryLayout />
      </div>
    </>
  ),
})
