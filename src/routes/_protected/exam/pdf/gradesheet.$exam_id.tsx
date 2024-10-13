import { getCourses } from "@/common_queries/courses";
import { getExamDetails } from "@/common_queries/exam";
import { getStudentData } from "@/common_queries/examResult";
import GradesheetFooter from "@/components/pdf/gradesheet/footer";
import GradesheetBody from "@/components/pdf/gradesheet/gradesheetBody";
import GradesheetHeader from "@/components/pdf/gradesheet/header";
import { tw } from "@/components/pdf/styles";
import { CourseData, ExamDetails, TabulationStudentDataType } from "@/type";
import { Document, Page, PDFViewer, Text } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute(
  "/_protected/exam/pdf/gradesheet/$exam_id",
)({
  component: GradesheetPDF,
});

function GradesheetPDF() {
  const { exam_id } = Route.useParams();
  const { data: studentData, isLoading: isLoadingStudentData } = useQuery({
    queryKey: ["exam", exam_id],
    queryFn: () => getStudentData(exam_id),
  });

  const { data: examDetails, isLoading: isLoadingExamDetails } = useQuery({
    queryKey: ["examDetails", exam_id],
    queryFn: () => getExamDetails(exam_id),
  });

  const { data: courses, isLoading: isLoadingCourses } = useQuery({
    queryKey: ["courses", exam_id],
    queryFn: () => getCourses(exam_id),
  });


  if (isLoadingCourses || isLoadingStudentData || isLoadingExamDetails) {
    return (
      <PDFViewer style={tw("h-screen w-screen")}>
        <Document>
          <Page orientation="landscape" size="A4">
            <Text>Loading...</Text>
          </Page>
        </Document>
      </PDFViewer>
    );
  }

  if (!studentData || !examDetails || !courses) {
    return (
      <PDFViewer style={tw("h-screen w-screen")}>
        <Document>
          <Page orientation="landscape" size="A4">
            <Text>No Data</Text>
          </Page>
        </Document>
      </PDFViewer>
    );
  }

  return (
    <PDFViewer style={tw("h-screen w-screen")}>
      <Document>
        <GradesheetPage courses={courses} studentData={studentData} examDetails={examDetails} />
      </Document>
    </PDFViewer>
  );
}

function GradesheetPage({
  studentData,
  examDetails,
  courses
}: {
  studentData: TabulationStudentDataType;
  examDetails: ExamDetails;
  courses: CourseData[]
}): React.ReactNode[] {
  const pages: React.ReactNode[] = [];
  studentData.map((student, index) => {
    pages.push(
      <Page
        key={student.student_id}
        size="A4"
        orientation="landscape"
        style={tw("flex flex-col p-20 text-xs gap-4 justify-between font-sans")}
      >
        <GradesheetHeader examDetails={examDetails} student={student} index={index} />
        <GradesheetBody student={student} courses={courses} />
        <GradesheetFooter />
      </Page>,
    );
  });

  return pages;
}
