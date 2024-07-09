import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DecodeTab from "./tabs/decode";
import SetA_tab from "./tabs/set_A";
import SetB_tab from "./tabs/set_B";
import CatmTab from "./tabs/catm";

const CourseTabs = ({
  exam_id,
  course_id,
}: {
  exam_id: string;
  course_id: string;
}) => {
  return (
    <Tabs className="border-2">
      <TabsList className="grid w-full grid-cols-6" defaultValue={"decode"}>
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
        <SetA_tab exam_id={exam_id} course_id={course_id} set={"A"} />
      </TabsContent>
      <TabsContent value="Set-B">
        <SetB_tab exam_id={exam_id} course_id={course_id} set={"B"} />
      </TabsContent>
      <TabsContent value="catm">
        <CatmTab exam_id={exam_id} course_id={course_id} />
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabs;
