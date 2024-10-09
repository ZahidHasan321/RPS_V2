import { createFileRoute } from "@tanstack/react-router";
import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { tw } from "@/components/pdf/styles";
import { useQuery } from "@tanstack/react-query";
import { getExamDetails } from "@/common_queries/exam";
import secureAxios from "@/lib/interceptor";
import { Course, CourseResponse, ExamDetails } from "@/type";
import Header from "@/components/pdf/summationSheet/header";
import { ReactNode } from "react";
import SummationBody from "@/components/pdf/summationSheet/body";
import SummationFooter from "@/components/pdf/summationSheet/footer";
export const Route = createFileRoute(
  "/_protected/exam/pdf/summation/$exam_id/$course_id",
)({
  component: SummationPage,
});

function SummationPage() {
  const { exam_id, course_id } = Route.useParams();

  const { data: exam_details, isLoading: isLoadingExamDetails } = useQuery({
    queryKey: ["examDetails", exam_id],
    queryFn: () => getExamDetails(exam_id),
  });

  const { data: course, isLoading: isLoadingCourse } = useQuery({
    queryKey: ["courseDetails", course_id],
    queryFn: () => getCourseDetails(course_id),
  });

  const { data: courseResult, isLoading: isLoadingCourseResult } = useQuery({
    queryKey: ["courseResult", exam_id, course_id],
    queryFn: () => getCourseResult(exam_id, course_id),
  });

  if (isLoadingExamDetails || isLoadingCourse || isLoadingCourseResult)
    return <div>Loading...</div>;

  if (!exam_details || !course || !courseResult)
    return <div>No Data Found</div>;

  return (
    <PDFViewer style={tw("h-screen w-screen")}>
      <Document>
        <SummationDocument
          exam_details={exam_details}
          course={course}
          courseResult={courseResult}
        />
      </Document>
    </PDFViewer>
  );
}

function SummationDocument({
  exam_details,
  course,
  courseResult,
}: {
  exam_details: ExamDetails;
  course: Course;
  courseResult: CourseResponse[];
}) {
  const pages: ReactNode[] = [];

  for (let i = 0; i < courseResult.length; i += 12) {
    pages.push(
      <Page key={i} size="A4" style={styles.page}>
        <View>
          <Header exam_details={exam_details} course={course} />
        </View>
        <View style={tw("text-base")}>
          <SummationBody courseResult={courseResult.slice(i, i + 12)} />
        </View>
        <View>
          <SummationFooter />
        </View>
      </Page>,
    );
  }

  return pages;
}

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 40,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 10,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
  },
});

function getCourseDetails(course_id: string): Promise<Course> {
  return secureAxios.get(`/course/${course_id}`).then((res) => res.data);
}

async function getCourseResult(exam_id: string, course_id: string) {
  return secureAxios
    .get(`/total-papermark/exam/${exam_id}/course/${course_id}`)
    .then((res) => handleImprovement(res.data, exam_id, course_id));
}

async function handleImprovement(
  students: CourseResponse[],
  exam_id: string,
  course_id: string,
) {
  const studentPromises = students.map(async (student: CourseResponse) => {
    if (student.student_status === "Improvement") {
      const prevResult = await getPrevResult(
        student.student_id,
        exam_id,
        course_id,
      ).then();

      return {
        student_id: student.student_id,
        setA_mark: student.setA_mark,
        setB_mark: student.setB_mark,
        setA_paper_code: student.setA_paper_code,
        setB_paper_code: student.setB_paper_code,
        catm: prevResult,
        student_status: student.student_status,
      };
    } else {
      return student;
    }
  });

  return Promise.all(studentPromises);
}

function getPrevResult(
  student_id: number,
  exam_id: string,
  course_id: string,
): Promise<{ ct_mark: number; attendance_mark: number }> {
  return secureAxios
    .get(
      `/total-papermark/prev-result/${exam_id}/course/${course_id}/student/${student_id}`,
    )
    .then((res) => res.data);
}
