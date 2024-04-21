import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Combobox from "../combobox/combobox";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type framework = {
  value: string;
  label: string;
};

export type MemberIdItem = {
  idx: number;
  value: string;
};

const CreateExamCommittee = () => {
  const [members, setMembers] = useState<MemberIdItem[]>([]);
  const [count, setCount] = useState<number[]>([1, 2, 3, 4]);
  const [teachers, setTeachers] = useState<framework[]>([
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

  function handleSubmit() {
    console.log(members);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Create Committee</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new exam committee</DialogTitle>
        </DialogHeader>

        {count.map((num: unknown, idx: number) => (
          <div key={idx} className="flex flex-row items-center ">
            <Combobox
              key={idx}
              frameworks={teachers}
              addToData={setMembers}
              selectedList={members}
              placeholder="Search teacher...."
              label="Select member"
              pValue={members.find((item) => item.idx === idx)?.value}
            />
            {idx === count.length - 1 && count.length < 7 && (
              <Button
                onClick={() =>
                  setCount((count) => [...count, count.length + 1])
                }
              >
                <PlusIcon />
              </Button>
            )}
          </div>
        ))}

        <DialogFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamCommittee;
