import { Toaster } from "@/components/ui/sonner";
import useAuth from "@/hooks/auth";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface MyRouterContext {
  auth: ReturnType<typeof useAuth> | undefined;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    return (
      <>
        <Outlet />
        <Toaster duration={5000} closeButton={true} />
      </>
    );
  },
});
