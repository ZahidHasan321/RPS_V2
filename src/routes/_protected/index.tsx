import Catms from "@/components/pageComponents/dashboard/catms";
import Exams from "@/components/pageComponents/dashboard/exams";
import Papers from "@/components/pageComponents/dashboard/papers";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

const Home = () => {
  return (
    <div className="m-20 flex flex-col gap-10 font-inter">
      <div className="flex flex-col gap-6">
        <h1 className="font-semibold text-4xl">Ongoing Exams</h1>
        <Exams />
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-wrap gap-10 mb-5 min-h-[70%]">
        <Papers className="w-2/3" />
        <Separator orientation="vertical" />
        <Catms className="w-fit" />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_protected/")({
  component: Home,
});
