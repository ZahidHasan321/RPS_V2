import { getCourses } from "@/common_queries/courses";
import { getExamDetails } from "@/common_queries/exam";
import { tw } from "@/components/pdf/styles";
import Header from "@/components/pdf/tabulationSheet/Header/header";
import Body from "@/components/pdf/tabulationSheet/body/body";
import Footer from "@/components/pdf/tabulationSheet/footer/footer";
import { getGPA } from "@/constants/grades";
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
import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ReactNode } from "react";

const studentQuery = ({ exam_id }: { exam_id: string }) =>
  queryOptions({
    queryKey: ["student", exam_id],
    queryFn: () => getStudentData(exam_id),
  });

export const Route = createFileRoute(
  "/_protected/exam/pdf/tabulation/$exam_id",
)({
  component: TabulationPage,
  loader: ({ context: { queryClient }, params }) => {
    queryClient.ensureQueryData(studentQuery(params));
  },
});

function TabulationPage() {
  const { exam_id } = Route.useParams();

  const { data: studentData, isLoading: isLoadingStudentData } =
    useSuspenseQuery(studentQuery({ exam_id }));

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
    isLoadingStudentData ||
    isLoadingExamCommittee ||
    isLoadingExamDetails
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
    courses === undefined
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

async function getStudentData(exam_id: string) {
  const studentData: studentDataType[] = await secureAxios
    .get(`/marksheet/${exam_id}`)
    .then((res) => res.data);
    
  const processedData: TabulationStudentDataType = [];
  studentData.map((student) => {
    let index = processedData.findIndex(
      (data) => data.student_id === student.student_id,
    );

    if (index === -1) {
      processedData.push({
        student_id: student.student_id,
        student_name: student.student_name,
        hall_name: student.hall_name,
        session: student.session,
        student_status: student.student_status,
        courses: new Map(),
        improves: new Map(),
      });
    }

    index = processedData.findIndex(
      (data) => data.student_id === student.student_id,
    );

    student.courses.map((course) => {
      const total =
        course.fem && course.catm
          ? course.fem + course.catm
          : course.fem || course.catm;

      processedData[index].courses.set(course.course_id, {
        catm: course.catm,
        fem: course.fem,
        gpa: getGPA(total, course.credit),
        total: total ? Math.ceil(total) : null,
      });
    });

    if (student.improves) {
      student.improves.map((course) => {
        const prevCatm = student.courses.find(
          (c) => c.course_id === course.course_id,
        )?.catm;
        const total =
          course.fem && prevCatm
            ? course.fem + prevCatm
            : prevCatm || course.fem;
        processedData[index].improves?.set(course.course_id, {
          catm: prevCatm ?? 0,
          fem: course.fem,
          gpa: getGPA(total, course.credit),
          total: total ? Math.ceil(total) : null,
        });
      });
    }
  });

  return processedData;
}

async function getExamCommittee(exam_id: string) {
  return await secureAxios
    .get(`/exam-committee/exam/${exam_id}/members`)
    .then((res) => res.data);
}
