import { createFileRoute } from "@tanstack/react-router";

const Home = () => {
  return <div>hello from exam commmittee</div>;
};

export const Route = createFileRoute("/exam-committee/")({
  component: Home,
});
