import { courseTeacherType } from "@/type";

export default function CourseTeacherDetails({
  data,
}: {
  data: courseTeacherType | undefined;
}) {
  if (!data)
    return (
      <div className="flex flex-col gap-2 border p-2">
        <p>No Course Teacher Found</p>
      </div>
    );

  return (
    <div className="flex flex-col border p-2">
      <p>
        {data.title} {data.first_name} {data.last_name}
      </p>
      <p>{data.designation}</p>
      <p>{data.department_name}</p>
      <p>{data.faculty}</p>
      <p>{data.is_catm_submitted ? "Submitted" : "Not Submitted"}</p>
    </div>
  );
}
