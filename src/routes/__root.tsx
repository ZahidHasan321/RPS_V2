import { Toaster } from "@/components/ui/sonner";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => {
      return (
        <>
          <Outlet />
          <Toaster duration={5000} closeButton={true} />
        </>
      );
    },
  },
);
