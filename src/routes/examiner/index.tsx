import { createFileRoute } from "@tanstack/react-router";

const Home = () => {
  return <div> Hello from examiner </div>;
};

export const Route = createFileRoute("/examiner/")({
  component: Home,
});
