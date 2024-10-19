import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";
import DecodeTab from "./tabs/decode";
import SetTab from "./tabs/set";
import CatmTab from "./tabs/catm";

const CourseTabs = ({
  exam_id,
  course_id,
  courseType,
}: {
  exam_id: string;
  course_id: string;
  courseType: string;
}) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [gridNo, setGridNo] = useState(() => {
    if (courseType === "Theory") {
      return 6;
    } else if (courseType === "Lab") {
      return 5;
    } else if (courseType === "Project") {
      return 6;
    } else {
      return 5;
    }
  });

  return (
    <Tabs defaultValue="decode" className="h-[95vh]">
      <TabsList
        className={`grid w-full grid-cols-${gridNo}`}
        ref={tabsRef}
        onClick={() => tabsRef.current?.scrollIntoView({ behavior: "smooth" })}
      >
        <div></div>
        <TabsTrigger value="decode">Decode</TabsTrigger>
        <SetTrigger courseType={courseType} />
        {courseType !== "Project" && (
          <TabsTrigger value="catm">CATM</TabsTrigger>
        )}
        <div></div>
      </TabsList>
      <TabsContent value="decode">
        <DecodeTab
          exam_id={exam_id}
          course_id={course_id}
          course_type={courseType}
        />
      </TabsContent>
      <SetContent
        exam_id={exam_id}
        course_id={course_id}
        course_type={courseType}
      />
      <TabsContent value="catm">
        <CatmTab exam_id={exam_id} course_id={course_id} />
      </TabsContent>
    </Tabs>
  );
};

function SetTrigger({ courseType }: { courseType: string }) {
  if (courseType === "Theory") {
    return (
      <TabsList className="grid w-full grid-cols-2 col-span-2">
        <TabsTrigger value="Set-A">1st Examiner</TabsTrigger>
        <TabsTrigger value="Set-B">2nd Examiner</TabsTrigger>
      </TabsList>
    );
  } else if (courseType == "Lab") {
    return (
      <div className="grid w-full grid-cols-1">
        <TabsTrigger value="Set-A">Examiner</TabsTrigger>
      </div>
    );
  } else if (courseType == "Project") {
    return (
      <div className="grid w-full grid-cols-3 col-span-3">
        <TabsTrigger value="Set-A">1st Examiner</TabsTrigger>
        <TabsTrigger value="Set-B">2nd Examiner</TabsTrigger>
        <TabsTrigger value="Set-C">3rd Examiner</TabsTrigger>
      </div>
    );
  } else {
    return (
      <div>
        <TabsTrigger value="Set-A">Set-A</TabsTrigger>
      </div>
    );
  }
}

function SetContent({
  exam_id,
  course_id,
  course_type,
}: {
  exam_id: string;
  course_id: string;
  course_type: string;
}) {
  if (course_type === "Theory") {
    return (
      <div>
        <TabsContent value="Set-A">
          <SetTab exam_id={exam_id} course_id={course_id} set={"A"} />
        </TabsContent>
        <TabsContent value="Set-B">
          <SetTab exam_id={exam_id} course_id={course_id} set={"B"} />
        </TabsContent>
      </div>
    );
  } else if (course_type === "Lab") {
    return (
      <div>
        <TabsContent value="Set-A">
          <SetTab exam_id={exam_id} course_id={course_id} set={"A"} />
        </TabsContent>
      </div>
    );
  } else if (course_type === "Project") {
    return (
      <div>
        <TabsContent value="Set-A">
          <SetTab exam_id={exam_id} course_id={course_id} set={"A"} />
        </TabsContent>
        <TabsContent value="Set-B">
          <SetTab exam_id={exam_id} course_id={course_id} set={"B"} />
        </TabsContent>
        <TabsContent value="Set-C">
          <SetTab exam_id={exam_id} course_id={course_id} set={"C"} />
        </TabsContent>
      </div>
    );
  } else {
    <div>
      <TabsContent value="Set-A">
        <SetTab exam_id={exam_id} course_id={course_id} set={"A"} />
      </TabsContent>
    </div>;
  }
}
export default CourseTabs;
