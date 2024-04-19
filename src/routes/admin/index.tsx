import { createFileRoute, Link } from "@tanstack/react-router";

const Home = () => {
  return (
    <>
      <Link to="">Home</Link>
    </>
  );
};

export const Route = createFileRoute("/admin/")({
  component: Home,
});
