import Catms from "@/components/pageComponents/dashboard/catms";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/catm/all-catms")({
  component: AllCatms,
});

function AllCatms() {
  return (
    <div className="m-20">
      <Catms />
    </div>
  );
}
