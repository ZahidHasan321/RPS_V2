import Catms from "@/components/pageComponents/dashboard/catms";
import Exams from "@/components/pageComponents/dashboard/exams";
import Papers from "@/components/pageComponents/dashboard/papers";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

const Home = () => {
  return (
    <div className="mx-20 my-10 flex flex-col gap-10 font-inter">
      <p className="font-semibold text-5xl">Dashboard</p>
      <div className="flex flex-col gap-6">
        <h1 className="font-semibold text-2xl">Ongoing Exams</h1>
        <Exams />
      </div>
      <Separator orientation="horizontal" />
      <div>
        {" "}
        <h1 className="font-semibold text-2xl mb-4">Assigned Papers</h1>
        <Papers is_submitted={0} />
      </div>
      <Separator orientation="horizontal" />
      <div>
        <h1 className="font-semibold text-2xl mb-4">Class Test Marks</h1>
        <Catms is_catm_submitted={0} />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_protected/")({
  component: Home,
});
