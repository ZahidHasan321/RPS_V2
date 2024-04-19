import Combobox from "@/components/combobox/combobox";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

type data = {
  value: string;
  label: string;
};

const Home = () => {
  const [members, setMembers] = useState<string[]>([]);
  const [data, setData] = useState<data[]>([
    {
      value: "1",
      label: "RPDN,CSE,CU",
    },
    {
      value: "2",
      label: "ANC,CSE,CU",
    },
    {
      value: "3",
      label: "RK,CSE,CU",
    },
    {
      value: "4",
      label: "OSI,CSE,CU",
    },
  ]);

  console.log(members);
  const count = 5;

  return (
    <div className="h-screen w-full flex flex-col gap-10 justify-center items-center">
      {[...Array(count)].map((_: unknown, idx: number) => (
        <Combobox
          key={idx}
          frameworks={data}
          addToData={setMembers}
          selectedList={members}
        />
      ))}
    </div>
  );
};

export const Route = createFileRoute("/admin/")({
  component: Home,
});
