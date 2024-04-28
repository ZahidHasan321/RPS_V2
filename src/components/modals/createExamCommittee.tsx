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
import { Checkbox } from "../ui/checkbox";

type teacher = {
  value: string;
  label: string;
};

export type MemberIdItem = {
  idx: number;
  value: string;
  role?: "Chairman" | "Member" | "Tabulator";
};

const CreateExamCommittee = () => {
  const [members, setMembers] = useState<MemberIdItem[]>([]);
  const [count, setCount] = useState<number[]>([1, 2, 3, 4]);
  const [teachers, setTeachers] = useState<teacher[]>([
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

  //TODO: Fix the design here
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Create Committee</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new exam committee</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row gap-2">
          <div>
            <Combobox
              boxNumber={0}
              frameworks={teachers}
              addToData={setMembers}
              selectedList={members}
              placeholder="Search teacher...."
              label="Select chairman"
              pValue={members.find((item) => item.idx === 0)?.value}
            />
            {count.map((num: number, idx: number) => {
              const selectedMember: MemberIdItem | undefined = members.find(
                (item) => item.idx === num,
              );
              return (
                <div key={idx} className="flex flex-row items-center ">
                  <Combobox
                    key={idx}
                    boxNumber={num}
                    frameworks={teachers}
                    addToData={setMembers}
                    selectedList={members}
                    placeholder="Search teacher...."
                    label="Select member"
                    pValue={selectedMember?.value}
                  />
                  {selectedMember && (
                    <Checkbox
                      onCheckedChange={(checked: boolean) =>
                        setMembers(
                          members.map((item) =>
                            item.idx === num
                              ? {
                                  ...item,
                                  role: checked ? "TABULATOR" : "MEMBER",
                                }
                              : item,
                          ),
                        )
                      }
                      checked={
                        selectedMember.role === "TABULATOR" ? true : false
                      }
                    />
                  )}

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
              );
            })}
          </div>
          <p>Set as Tabulator</p>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamCommittee;
