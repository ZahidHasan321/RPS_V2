import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DecodeTab from "./tabs/decode";
import CatmTab from "./tabs/catm";
import SetTab from "./tabs/set";

const CourseTabs = ({
  exam_id,
  course_id,
  courseType,
}: {
  exam_id: string;
  course_id: string;
  courseType: string;
}) => {
  console.log(courseType);
  return (
    <Tabs defaultValue="decode">
      <TabsList className="grid w-full grid-cols-5">
        <div></div>
        <TabsTrigger value="decode">Decode</TabsTrigger>
        {courseType == "Theory" ? (
          <>
            <TabsTrigger value="Set-A">Set-A</TabsTrigger>
            <TabsTrigger value="Set-B">Set-B</TabsTrigger>{" "}
          </>
        ) : (
          <TabsTrigger value="paper">Paper</TabsTrigger>
        )}
        <TabsTrigger value="catm">CATM</TabsTrigger>
        <div></div>
      </TabsList>
      <TabsContent value="decode">
        <DecodeTab exam_id={exam_id} course_id={course_id} />
      </TabsContent>
      {courseType == "Theory" ? (
        <>
          <TabsContent value="Set-A">
            <SetTab exam_id={exam_id} course_id={course_id} set={"A"} />
          </TabsContent>
          <TabsContent value="Set-B">
            <SetTab exam_id={exam_id} course_id={course_id} set={"B"} />
          </TabsContent>
        </>
      ) : (
        <TabsContent value="paper">
          <SetTab exam_id={exam_id} course_id={course_id} set={"A"} />
        </TabsContent>
      )}
      <TabsContent value="catm">
        <CatmTab exam_id={exam_id} course_id={course_id} />
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabs;
