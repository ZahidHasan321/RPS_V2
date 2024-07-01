import Catms from "@/components/dashboard/catms";
import Exams from "@/components/dashboard/exams";
import Papers from "@/components/dashboard/papers";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

const Home = () => {
  return (
    <div className="m-20 flex flex-col gap-10 font-inter">
      <h1 className="font-semibold">Ongoing Exams</h1>
      <Exams />
      <Separator orientation="horizontal" />
      <div className="flex gap-10 mb-5">
        <Papers className="w-2/3" />
        <Separator orientation="vertical" />
        <Catms className="w-fit" />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});
