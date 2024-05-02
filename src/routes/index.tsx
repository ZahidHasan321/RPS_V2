import Catms from "@/components/dashboard/catms";
import Exams from "@/components/dashboard/exams";
import Papers from "@/components/dashboard/papers";
import { createFileRoute } from "@tanstack/react-router";

const Home = () => {
  return (
    <div className="m-20">
      <h1>Ongoing Exams</h1>
      <Exams />
      <div className="flex gap-10 my-10">
        <Papers className="w-2/3" />
        <Catms className="w-fit" />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});
