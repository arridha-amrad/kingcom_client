import { meQueryOptions } from '@/queryOptions/auth.queryOptions';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(meQueryOptions);
    if (!user) {
      throw redirect({
        to: '/',
        replace: true,
        search: {
          login: 'required',
          redirect: location.href,
        },
      });
    }
    return { user };
  },
});
