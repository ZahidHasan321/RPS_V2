import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import axios from "axios";
import { Suspense } from "react";

export type Phone = {
  id: string;
  name: string;
  data: Data;
};

export type Data = {
  color: string;
  capacity: string;
};

const Home = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["phones"],
    queryFn: async (): Promise<Phone[]> => {
      return await axios("https://api.restful-api.dev/objects").then(
        (res) => res.data,
      );
    },
  });

  if (isPending) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>Error:{error.message}</p>;
  }

  console.log(data);

  return (
    <div>
      <div className="flex flex-row gap-10 ">
        <Link className="text-blue-600" to="/admin">
          Go to admin
        </Link>
        <Link className="text-blue-600" to="/exam-committee">
          Go to exam committee
        </Link>
        <Link className="text-blue-600" to="/examiner">
          Go to examiner
        </Link>
      </div>
      <Suspense fallback={<p>Loading</p>}>
        {data?.map((item) => (
          <p key={item.id} className="px-2">
            {item?.data?.color}
          </p>
        ))}
      </Suspense>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});
