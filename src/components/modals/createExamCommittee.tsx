import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Combobox from "../combobox/combobox";
import { PlusIcon } from "@radix-ui/react-icons";

type framework = {
  value: string;
  label: string;
};

const CreateExamCommittee = () => {
  const [members, setMembers] = useState<string[]>([]);
  const [count, setCount] = useState<number>(3);
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

        {[...Array(count)].map((_: unknown, idx: number) => (
          <div key={idx} className="flex flex-row items-center ">
            <Combobox
              key={idx}
              frameworks={teachers}
              addToData={setMembers}
              selectedList={members}
              placeholder="Search teacher...."
              label="Select member"
            />
            {idx === count - 1 && count < 7 && (
              <Button onClick={() => setCount((count) => count + 1)}>
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
