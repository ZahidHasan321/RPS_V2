import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
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
        (res) => res.data
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
      <Suspense fallback={<p>Loading</p>}>
        {data?.map((item) => <p className="p-2">{item?.data?.color}</p>)}
      </Suspense>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});
