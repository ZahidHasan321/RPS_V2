import secureAxios from "@/lib/interceptor";
import { TeacherDataType } from "@/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Combobox from "../combobox/combobox";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function AssignExaminer({
  exam_id,
  course_id,
  set,
}: {
  exam_id: string;
  course_id: string;
  set: string;
}) {
  const queryClient = useQueryClient();

  const {
    data: teacherList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });

  const assignExamineMutation = useMutation({
    mutationFn: () => assignExaminer(exam_id, course_id, set, teacherId),
    onSuccess: () => {
      toast("Examiner assigned successfully");
      queryClient.invalidateQueries({
        queryKey: ["examiner", set, exam_id, course_id],
      });

      queryClient.invalidateQueries({
        queryKey: ["courseDetails", exam_id, course_id],
      });
    },
    onError: (error) => {
      toast("Unable to assign examiner");
      console.log(error);
    },
  });

  const [teacherId, setTeacherId] = useState("");

  if (error) console.log(error);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Assign Examiner</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Examiner</DialogTitle>
          <DialogDescription>Examiner for set</DialogDescription>
        </DialogHeader>
        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : null}
        {isError ? <div>Error</div> : null}
        {teacherList ? (
          <Combobox
            label="Select Teacher"
            frameworks={teacherList}
            placeholder="teacher_id"
            setData={setTeacherId}
            className="w-full"
          />
        ) : null}
        <DialogFooter>
          <Button
            variant="default"
            onClick={() => {
              assignExamineMutation.mutate();
            }}
          >
            Submit
          </Button>
          <DialogClose asChild>
            <Button variant={"ghost"}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

async function getTeachers(): Promise<{ label: string; value: string }[]> {
  const data: TeacherDataType[] | undefined = await secureAxios
    .get("/teacher", {
      params: {
        limit: "all",
        department_id: 1,
      },
    })
    .then((res) => res.data);

  if (data === undefined) return [];

  const processedData = data.map((teacher: TeacherDataType) => {
    return {
      label: `${teacher.first_name} ${teacher.last_name}`,
      value: teacher.teacher_id.toString(),
    };
  });

  return processedData;
}

async function assignExaminer(
  exam_id: string,
  course_id: string,
  set: string,
  teacher_id: string,
) {
  return await secureAxios.post("/examiner", {
    exam_id: parseInt(exam_id),
    course_id: parseInt(course_id),
    set: set,
    teacher_id: parseInt(teacher_id),
  });
}
