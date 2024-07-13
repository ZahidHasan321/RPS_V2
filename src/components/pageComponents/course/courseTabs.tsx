import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DecodeTab from "./tabs/decode";
import CatmTab from "./tabs/catm";
import SetTab from "./tabs/set";

const CourseTabs = ({
  exam_id,
  course_id,
}: {
  exam_id: string;
  course_id: string;
}) => {
  return (
    <Tabs className="border-2" defaultValue="decode">
      <TabsList className="grid w-full grid-cols-6">
        <div></div>
        <TabsTrigger value="decode">Decode</TabsTrigger>
        <TabsTrigger value="Set-A">Set-A</TabsTrigger>
        <TabsTrigger value="Set-B">Set-B</TabsTrigger>
        <TabsTrigger value="catm">CATM</TabsTrigger>
        <div></div>
      </TabsList>
      <TabsContent value="decode">
        <DecodeTab exam_id={exam_id} course_id={course_id} />
      </TabsContent>
      <TabsContent value="Set-A">
        <SetTab exam_id={exam_id} course_id={course_id} set={"A"} />
      </TabsContent>
      <TabsContent value="Set-B">
        <SetTab exam_id={exam_id} course_id={course_id} set={"B"} />
      </TabsContent>
      <TabsContent value="catm">
        <CatmTab exam_id={exam_id} course_id={course_id} />
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabs;
