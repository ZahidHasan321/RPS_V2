import { getGPA } from "@/constants/grades";
import secureAxios from "@/lib/interceptor";
import { TabulationStudentDataType } from "@/type";

export type studentDataType = {
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

export async function getStudentData(exam_id: string) {
  return secureAxios
    .get(`/marksheet/${exam_id}`)
    .then((res) => handleImprovements(exam_id, res.data))
    .then((res) => processData(res));
}

type prevMarksheet = {
  catm: number;
  fem: number;
  course_id: number;
  credit: number;
};

async function handleImprovements(
  exam_id: string,
  studentData: studentDataType[],
) {
  const promises = studentData.map(async (student) => {
    if (student.student_status === "Improvement") {
      const prevMarksheet: prevMarksheet[] = await secureAxios
        .get(`/marksheet/prev-result/${exam_id}/student/${student.student_id}`)
        .then((res) => res.data);

      student.courses = prevMarksheet;

      return student;
    }
    return student;
  });

  return Promise.all(promises);
}

async function processData(studentData: studentDataType[]) {
  const processedData: TabulationStudentDataType = [];
  studentData.map(async (student) => {
    let index = processedData.push({
      student_id: student.student_id,
      student_name: student.student_name,
      hall_name: student.hall_name,
      session: student.session,
      student_status: student.student_status,
      courses: new Map(),
      improves: new Map(),
    });

    index = index - 1;

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

  return Promise.all(processedData);
}
