import Catms from "@/components/pageComponents/dashboard/catms";
import Exams from "@/components/pageComponents/dashboard/exams";
import Papers from "@/components/pageComponents/dashboard/papers";
import { Separator } from "@/components/ui/separator";
import { createFileRoute, Link } from "@tanstack/react-router";

const Home = () => {
  return (
    <div className="m-20 flex flex-col gap-10 font-inter">
      <div className="flex flex-col gap-6">
        <h1 className="font-semibold text-4xl">Ongoing Exams</h1>
        <Exams />
        <Link
          to="/exam/all-exams"
          className="font-medium transition-colors text-blue-400 hover:text-blue-600 visited:text-blue-800"
        >
          see more
        </Link>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-wrap gap-10 mb-5 min-h-[70%]">
        <div className="flex flex-col">
          <Papers className="w-2/3" is_submitted={0} />
          <Link
            to="/examiner/all-papers"
            className="font-medium transition-colors text-blue-400 hover:text-blue-600 visited:text-blue-800"
          >
            see more
          </Link>
        </div>
        <Separator orientation="vertical" />
        <div>
          <Catms className="w-fit" is_catm_submitted={0} />
          <Link
            to="/catm/all-catms"
            className="font-medium transition-colors text-blue-400 hover:text-blue-600 visited:text-blue-800"
          >
            see more
          </Link>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_protected/")({
  component: Home,
});
