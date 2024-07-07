import { Toaster } from "@/components/ui/sonner";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Outlet />
        <Toaster duration={5000} closeButton={true} />
      </>
    );
  },
});
