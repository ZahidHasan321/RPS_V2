import Papers from "@/components/pageComponents/dashboard/papers";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/examiner/all-papers")({
  component: AllPapers,
});

function AllPapers() {
  return (
    <div className="m-20">
      <Papers />
    </div>
  );
}
