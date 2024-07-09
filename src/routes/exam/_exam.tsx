import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/exam/_exam")({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});
