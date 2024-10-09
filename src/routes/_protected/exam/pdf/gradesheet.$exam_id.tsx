import { getExamDetails } from "@/common_queries/exam";
import { getStudentData } from "@/common_queries/examResult";
import GradesheetHeader from "@/components/pdf/gradesheet/header";
import { tw } from "@/components/pdf/styles";
import { ExamDetails, TabulationStudentDataType } from "@/type";
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

  if (isLoadingStudentData || isLoadingExamDetails) {
    return <div>Loading...</div>;
  }

  if (!studentData || !examDetails) {
    return <div>No Data</div>;
  }

  return (
    <PDFViewer style={tw("h-screen w-screen")}>
      <Document>
        <GradesheetPage studentData={studentData} examDetails={examDetails} />
      </Document>
    </PDFViewer>
  );
}

function GradesheetPage({
  studentData,
  examDetails,
}: {
  studentData: TabulationStudentDataType;
  examDetails: ExamDetails;
}): React.ReactNode[] {
  const pages: React.ReactNode[] = [];

  studentData.map((student) => {
    pages.push(
      <Page
        key={student.student_id}
        size="A4"
        orientation="landscape"
        style={tw("flex flex-col p-10 text-xs")}
      >
        <GradesheetHeader />
      </Page>,
    );
  });

  return pages;
}
