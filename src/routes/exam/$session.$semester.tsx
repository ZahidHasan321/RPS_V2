import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exam/$session/$semester")({
  component: Home,
});

function Home() {
  const { session, semester } = Route.useParams();
  return (
    <div>
      hello from exam {session} {semester}
    </div>
  );
}
