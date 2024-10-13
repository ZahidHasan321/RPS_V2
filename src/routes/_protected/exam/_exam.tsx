import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/_protected/exam/_exam")({

  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});
