import { getCourses } from "@/common_queries/courses";
import { getExamDetails } from "@/common_queries/exam";
import { getStudentData } from "@/common_queries/examResult";
import { tw } from "@/components/pdf/styles";
import Header from "@/components/pdf/tabulationSheet/Header/header";
import Body from "@/components/pdf/tabulationSheet/body/body";
import Footer from "@/components/pdf/tabulationSheet/footer/footer";
import secureAxios from "@/lib/interceptor";
import {
  CourseData,
  ExamDetails,
  tabulationExamCommitee,
  TabulationStudentDataType,
} from "@/type";
import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ReactNode } from "react";

export const Route = createFileRoute(
  "/_protected/exam/pdf/tabulation/$exam_id",
)({
  component: TabulationPage,
});

function TabulationPage() {
  const { exam_id } = Route.useParams();

  const { data: studentData, isLoading: isLoadingStudentData } = useQuery({
    queryKey: ["exam", parseInt(exam_id)],
    queryFn: () => getStudentData(exam_id),
  });

  const { data: courses, isLoading: isLoadingCourses } = useQuery({
    queryKey: ["exam", exam_id],
    queryFn: () => getCourses(exam_id),
  });

  const { data: exam_committee, isLoading: isLoadingExamCommittee } = useQuery({
    queryKey: ["examCommittee", exam_id],
    queryFn: () => getExamCommittee(exam_id),
  });

  const { data: exam_details, isLoading: isLoadingExamDetails } = useQuery({
    queryKey: ["examDetails", exam_id],
    queryFn: () => getExamDetails(exam_id),
  });

  if (
    isLoadingCourses ||
    isLoadingExamCommittee ||
    isLoadingExamDetails ||
    isLoadingStudentData
  ) {
    return (
      <PDFViewer style={tw("h-screen w-screen")}>
        <Document>
          <Page size="A3">
            <Text>Loading...</Text>
          </Page>
        </Document>
      </PDFViewer>
    );
  }

  if (
    exam_details === undefined ||
    exam_committee === undefined ||
    courses === undefined ||
    studentData === undefined
  ) {
    return (
      <PDFViewer style={tw("h-screen w-screen")}>
        <Document>
          <Page size="A3">
            <Text>No data</Text>
          </Page>
        </Document>
      </PDFViewer>
    );
  }

  return (
    <PDFViewer style={tw("h-screen w-screen")}>
      <Document>
        <MyDocument
          studentData={studentData}
          courses={courses}
          exam_committee={exam_committee}
          exam_details={exam_details}
        />
      </Document>
    </PDFViewer>
  );
}

function MyDocument({
  studentData,
  courses,
  exam_committee,
  exam_details,
}: {
  studentData: TabulationStudentDataType;
  courses: CourseData[];
  exam_committee: tabulationExamCommitee[];
  exam_details: ExamDetails;
}) {
  const styles = StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      padding: 50,
      justifyContent: "center",
    },
  });

  const PageComponent: ReactNode[] = [];

  for (let i = 0; i < studentData.length; i = i + 3) {
    PageComponent.push(
      <Page key={i} size="A3" style={styles.page} orientation="landscape">
        <View>
          <Header courses={courses} exam_details={exam_details} />
        </View>
        <View style={tw("h-[380px] text-base")}>
          <Body index={i} studentData={studentData} courses={courses} />
        </View>
        <View>
          <Footer exam_committee={exam_committee} />
        </View>
      </Page>,
    );
  }

  return PageComponent;
}

type studentDataType = {
  student_id: number;
  student_name: string;
  hall_name: string;
  session: string;
  student_status: string;
  courses: {
    catm: number;
    fem: number;
    course_id: number;
    credit: number;
  }[];
  improves?: {
    catm: number;
    fem: number;
    course_id: number;
    credit: number;
  }[];
};

async function getExamCommittee(exam_id: string) {
  return secureAxios
    .get(`/exam-committee/exam/${exam_id}/members`)
    .then((res) => res.data);
}
