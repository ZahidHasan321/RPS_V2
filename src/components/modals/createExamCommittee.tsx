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
import axios, { all } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { programs } from "@/constants/programs";
import { getExamSessions } from "@/common_queries/session";
import { toast } from "sonner";

export type MemberIdItem = {
  idx: number;
  label: string;
  value: string;
  role?: "Chairman" | "Member" | "Tabulator";
};

type TeacherDataType = {
  user_id: string;
  department_id: number;
  teacher_id: number;
  title: string;
  designation: string;
  area_of_interest: string;
  profile_image_id: number;
  sign_id: number;
  permanent_address_id: number;
  email: string;
  phone: string;
  first_name_bn: string;
  last_name_bn: string;
  first_name: string;
  last_name: string;
  dob: string | Date;
  gender: string;
  blood_group: string;
  religion: string;
  ethnicity: string;
  nationality: string;
  password: string; // Consider security implications of storing passwords in plain text
  present_address_id: number;
};

const getTeachers = async () => {
  const data = await axios
    .get(import.meta.env.VITE_API_URL + "/teacher", {
      params: {
        limit: all,
        department_id: 1,
      },
    })
    .then((res) => res.data.data);

  const teachers: MemberIdItem[] = [];
  data.forEach((teacher: TeacherDataType) => {
    teachers.push({
      idx: teacher.teacher_id,
      label: `${teacher.first_name} ${teacher.last_name}`,
      value: teacher.teacher_id.toString(),
    });
  });

  return teachers;
};

const CreateExamCommittee = () => {
  const [members, setMembers] = useState<MemberIdItem[]>([]);
  const [count, setCount] = useState<number[]>([1, 2, 3, 4]);
  const [program, setProgram] = useState("");
  const [session, setSession] = useState("");
  const [semester, setSemester] = useState("");
  const { data: teachers } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });

  const { data: academicSessionData } = useQuery({
    queryKey: ["academicSession", program],
    queryFn: () => getExamSessions(program, 0),
    enabled: program !== "",
  });

  const createExamCommittee = useMutation({
    mutationFn: async () => {
      const memberList = members.map((m) => {
        return {
          teacher_id: m.value,
          role: m.role,
        };
      });

      return await axios.post(
        import.meta.env.VITE_API_URL + "/exam-committee",
        {
          memberList,
          program,
          session,
          semester,
        },
      );
    },
  });

  if (createExamCommittee.status === "success") {
    toast("Exam committee created successfully", {
      description: `${session} and ${semester} has been created`,
    });
  } else if (createExamCommittee.status === "error") {
    toast("Error creating exam committee");
  }

  console.log(createExamCommittee);

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
        <div className="w-full flex flex-col">
          <div className="flex flex-row flex-wrap gap-4 mb-10">
            <div>
              <div className="text-sm font-medium text-slate-700">
                Choose a program
              </div>
              <Combobox
                frameworks={programs}
                setData={setProgram}
                placeholder="Search program...."
                label="Select program"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-700">
                Choose a session
              </div>
              <Combobox
                disabled={program === "" || program === undefined}
                frameworks={academicSessionData?.sessions || []}
                setData={setSession}
                placeholder="Search session...."
                label="Select session"
              />
            </div>

            <div>
              <div className="text-sm font-medium text-slate-700">
                Choose a semester
              </div>
              <Combobox
                frameworks={academicSessionData?.semesters.get(session) || []}
                disabled={session === "" ? true : false}
                setData={setSemester}
                placeholder="Search semester...."
                label="Select semester"
              />
            </div>
          </div>

          <div className="text-sm font-medium text-slate-700">
            Choose committee chairman
          </div>
          <div className="flex">
            <Combobox
              boxNumber={0}
              frameworks={teachers || []}
              addToData={setMembers}
              selectedList={members}
              placeholder="Search teacher...."
              label="Select chairman"
              pValue={members.find((item) => item.idx === 0)?.value}
              width={2}
            />
            <div className="text-sm font-medium text-slate-700 pl-6">
              check as tabulator
            </div>
          </div>
          {count.map((num: number, idx: number) => {
            const selectedMember: MemberIdItem | undefined = members.find(
              (item) => item.idx === num,
            );
            return (
              <div className="mt-4" key={idx}>
                <div className="text-sm font-medium text-slate-700">
                  Select member
                </div>
                <div
                  key={idx}
                  className="w-full flex flex-row items-center gap-4"
                >
                  <Combobox
                    key={idx}
                    boxNumber={num}
                    frameworks={teachers || []}
                    addToData={setMembers}
                    selectedList={members}
                    placeholder="Search teacher...."
                    label="Select member"
                    pValue={selectedMember?.value}
                    width={2}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Checkbox
                          disabled={selectedMember === undefined}
                          onCheckedChange={(checked: boolean) =>
                            setMembers(
                              members.map((item) =>
                                item.idx === num
                                  ? {
                                      ...item,
                                      role: checked ? "Tabulator" : "Member",
                                    }
                                  : item,
                              ),
                            )
                          }
                          checked={
                            selectedMember &&
                            selectedMember.role === "Tabulator"
                              ? true
                              : false
                          }
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div>Assign as tabulator</div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            );
          })}

          {count.length < 10 && (
            <Button
              className="self-start mt-4"
              onClick={() => setCount((count) => [...count, count.length + 1])}
            >
              <PlusIcon />
            </Button>
          )}
        </div>
        <DialogFooter className="mr-6">
          <Button
            disabled={createExamCommittee.isPending}
            onClick={() => {
              if (members.length < 2)
                return toast("Please select at least 2 members");
              if (program === "" || program === undefined)
                return toast("Please select program");
              if (session === "" || session === undefined)
                return toast("Please select session");
              if (semester === "" || semester === undefined)
                return toast("Please select semester");
              createExamCommittee.mutate();
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamCommittee;
