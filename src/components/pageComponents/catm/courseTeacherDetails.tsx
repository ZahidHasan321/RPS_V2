import { cn } from "@/lib/utils";
import { courseTeacherType } from "@/type";

export default function CourseTeacherDetails({
  data,
  className,
}: {
  data: courseTeacherType | undefined;
  className?: string;
}) {
  if (!data)
    return (
      <div className={cn("flex flex-col gap-2 border p-2", className)}>
        <p>No Course Teacher Found</p>
      </div>
    );

  return (
    <div className={cn("flex flex-col border p-2", className)}>
      <p>
        <span className="font-bold">Name:</span> {data.title} {data.first_name}{" "}
        {data.last_name}
      </p>
      <p>
        <span className="font-bold">Department:</span> {data.department_name}
      </p>
      <p>
        <span className="font-bold">Submitted:</span>{" "}
        {data.is_catm_submitted ? (
          <span className="text-green-500">Submitted</span>
        ) : (
          <span className="text-red-500">Pending</span>
        )}
      </p>
    </div>
  );
}
