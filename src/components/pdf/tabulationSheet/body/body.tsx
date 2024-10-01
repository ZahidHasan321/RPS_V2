import { getLetterGrade } from "@/constants/grades";
import { CourseData, TabulationStudentDataType } from "@/type";
import { Text, View } from "@react-pdf/renderer";
import { tw } from "../../styles";
import { Table, VCell } from "../tableComponents";
import { markPerCredit } from "@/helper/consts";
import { useMemo, useState } from "react";
export default function Body({
  studentData,
  courses,
  index,
}: {
  studentData: TabulationStudentDataType;
  courses: CourseData[];
  index: number;
}) {
  const [TCE, setTCE] = useState([0, 0, 0]);
  const [TCP, setTCP] = useState([0, 0, 0]);
  const [failed, setFailed] = useState<string[][]>([[], [], []]);

  const total_credit = useMemo(() => {
    return courses.reduce((acc, { credit }) => acc + credit, 0);
  }, [courses]);

  useMemo(() => {
    let gpa = 0;
    courses.map((course) => {
      studentData.slice(index, index + 3).map((student, idx) => {
        if (student.student_status === "Improvement") {
          const improvedGPA = student.improves?.get(course.course_id)?.gpa ?? 0;
          const regularGPA = student.courses.get(course.course_id)?.gpa ?? 0;
          gpa = improvedGPA > regularGPA ? improvedGPA : regularGPA;
          if (gpa > 3.25) gpa = 3.25;
        } else {
          gpa = student.courses.get(course.course_id)?.gpa ?? 0;
        }

        if (gpa > 0) {
          setTCE((prev) => {
            const newTCE = [...prev];

            newTCE[idx] += course.credit;
            return newTCE;
          });

          const total = course.credit * gpa;
          setTCP((prev) => {
            const newTCP = [...prev];

            newTCP[idx] += total;
            return newTCP;
          });
        } else if (
          (gpa === 0 && student.courses.get(course.course_id)) ||
          student.improves?.get(course.course_id)
        ) {
          const code = course.course_code.split(" ")[1];

          setFailed((prev) => {
            const newFailed = [...prev];
            newFailed[idx].push(code);
            return newFailed;
          });
        }
      });
    });
  }, [studentData, courses, index]);

  return (
    <Table
      className={`border-t-0 absolute h-[90vw] -rotate-90 -translate-x-[380px] origin-top-left ${courses.length > 12 ? "text-sm" : ""}`}
    >
      <View style={tw("flex flex-row-reverse border-r w-[360px]")}>
        <View style={tw("flex flex-col w-1/4")}>
          <VCell className="border-t">
            <Text>Serial No.</Text>
          </VCell>
          <VCell className="h-14">
            <Text>Hall</Text>
          </VCell>
          <VCell>
            <Text>Student ID</Text>
          </VCell>
          <VCell className="h-14">
            <Text>Student Name</Text>
          </VCell>
          <VCell>
            <Text>Session</Text>
          </VCell>
          <VCell className="min-h-[16px] text-sm">
            <Text> </Text>
          </VCell>
        </View>
        {studentData.slice(index, index + 3).map((student, idx) => {
          return (
            <View key={idx} style={tw("flex flex-col w-1/4")}>
              <VCell className="border-t">
                <Text>{idx + index + 1}</Text>
              </VCell>
              <VCell
                className={`h-14 ${student.hall_name.length > 22 ? "text-sm" : ""}`}
              >
                <Text>{student.hall_name}</Text>
              </VCell>
              <VCell>
                <Text>{student.student_id}</Text>
              </VCell>
              <VCell
                className={`h-14 ${student.student_name.length > 22 ? "text-sm" : ""}`}
              >
                <Text>{student.student_name}</Text>
              </VCell>
              <VCell>
                <Text>{student.session}</Text>
              </VCell>

              <View style={tw("flex flex-row text-sm")}>
                <VCell className="w-1/2 min-h-[16px]">
                  <Text>Improve</Text>
                </VCell>
                <VCell className="w-1/2 min-h-[16px]">
                  <Text>Regular</Text>
                </VCell>
              </View>
            </View>
          );
        })}
      </View>

      <View>
        {courses.map((course, idx) => (
          <View
            key={idx}
            style={tw(`flex flex-row-reverse border-r w-[360px]`)}
          >
            <View style={tw("flex flex-row h-full w-1/4")}>
              <View style={tw("w-2/4 border-r")}>
                {course.course_type === "Theory" && (
                  <>
                    <VCell>
                      <Text>CATM</Text>
                    </VCell>
                    <VCell>
                      <Text>FEM</Text>
                    </VCell>
                  </>
                )}
                <VCell>
                  <Text>MO</Text>
                </VCell>
                <VCell>
                  <Text>LG</Text>
                </VCell>
                <VCell>
                  <Text>CP</Text>
                </VCell>
              </View>
              <View style={tw("relative w-1/4 border-r h-[100%] border-b")}>
                <Text
                  style={tw(
                    `absolute rotate-90 top-[43%] -left-5 w-16 ${courses.length > 12 ? "text-xs" : "text-sm"}`,
                  )}
                >
                  {course.credit * markPerCredit} Marks
                </Text>
              </View>
              <View style={tw("relative w-1/4 border-b")}>
                <Text style={tw(`absolute w-16 rotate-90 top-[35%]  -left-5`)}>
                  {course.course_code}
                </Text>
              </View>
            </View>
            {studentData.slice(index, index + 3).map((student, idx) => {
              return (
                <View
                  key={idx}
                  style={tw(
                    `flex text-base flex-col w-1/4 ${courses.length > 12 ? "text-sm" : ""}`,
                  )}
                >
                  {course.course_type === "Theory" ? (
                    <>
                      <View style={tw("flex flex-row")}>
                        <VCell className="w-1/2">
                          <Text>
                            {student.improves
                              ?.get(course.course_id)
                              ?.catm?.toFixed(2) ?? " "}
                          </Text>
                        </VCell>
                        <VCell className="w-1/2">
                          <Text>
                            {student.courses
                              .get(course.course_id)
                              ?.catm?.toFixed(2) ?? " "}
                          </Text>
                        </VCell>
                      </View>

                      <View style={tw("flex flex-row")}>
                        <VCell className="w-1/2">
                          <Text>
                            {student.improves
                              ?.get(course.course_id)
                              ?.fem?.toFixed(2) ?? " "}
                          </Text>
                        </VCell>
                        <VCell className="w-1/2">
                          <Text>
                            {student.courses
                              .get(course.course_id)
                              ?.fem?.toFixed(2) ?? " "}
                          </Text>
                        </VCell>
                      </View>
                    </>
                  ) : null}

                  <View style={tw("flex flex-row")}>
                    <VCell className="w-1/2">
                      <Text>
                        {student.improves
                          ?.get(course.course_id)
                          ?.total?.toFixed(0) ?? " "}
                      </Text>
                    </VCell>
                    <VCell className="w-1/2">
                      <Text>
                        {student.courses
                          .get(course.course_id)
                          ?.total?.toFixed(0) ?? " "}
                      </Text>
                    </VCell>
                  </View>

                  <View style={tw("flex flex-row")}>
                    <VCell className="w-1/2">
                      <Text>
                        {getLetterGrade(
                          student.improves?.get(course.course_id)?.total,
                          course.credit,
                        )}
                      </Text>
                    </VCell>
                    <VCell className="w-1/2">
                      <Text>
                        {getLetterGrade(
                          student.courses.get(course.course_id)?.total,
                          course.credit,
                        )}
                      </Text>
                    </VCell>
                  </View>

                  <View style={tw("flex flex-row")}>
                    <VCell className="w-1/2">
                      <Text>
                        {student.improves?.get(course.course_id)?.gpa
                          ? student.improves.get(course.course_id)?.gpa ??
                            0 * course.credit
                          : " "}
                      </Text>
                    </VCell>
                    <VCell className="w-1/2">
                      <Text>
                        {student.courses?.get(course.course_id)?.gpa != null
                          ? (
                              course.credit *
                              (student.courses.get(course.course_id)?.gpa ?? 0)
                            ).toFixed(2)
                          : " "}
                      </Text>
                    </VCell>
                  </View>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      <View style={tw("flex flex-row-reverse border-r w-[360px]")}>
        <View style={tw("flex flex-col w-1/4")}>
          <VCell>
            <Text>TCE</Text>
          </VCell>
          <VCell>
            <Text>TCP</Text>
          </VCell>
          <VCell>
            <Text>GPA</Text>
          </VCell>
          <VCell>
            <Text>Result</Text>
          </VCell>
          <VCell>
            <Text>Remarks</Text>
          </VCell>
        </View>
        {studentData.slice(index, index + 3).map((_, idx) => {
          const gpa = TCP[idx] / total_credit;
          return (
            <View key={idx} style={tw("flex flex-col w-1/4")}>
              <View style={tw("flex flex-row")}>
                <VCell className="w-1/2">
                  <Text> </Text>
                </VCell>
                <VCell className="w-1/2">
                  <Text>{TCE[idx].toFixed(2)}</Text>
                </VCell>
              </View>

              <View style={tw("flex flex-row")}>
                <VCell className="w-1/2">
                  <Text> </Text>
                </VCell>
                <VCell className="w-1/2">
                  <Text>{TCP[idx].toFixed(2)}</Text>
                </VCell>
              </View>

              <View style={tw("flex flex-row")}>
                <VCell className="w-1/2">
                  <Text> </Text>
                </VCell>
                <VCell className="w-1/2">
                  <Text>{gpa.toFixed(2)}</Text>
                </VCell>
              </View>

              <View style={tw("flex flex-row")}>
                <VCell className="w-1/2">
                  <Text> </Text>
                </VCell>
                <VCell className="w-1/2">
                  <Text>{gpa >= 2.2 ? "P" : "F"}</Text>
                </VCell>
              </View>

              <View style={tw("flex flex-row")}>
                <VCell className="w-1/2">
                  <Text> </Text>
                </VCell>
                <VCell className="w-1/2">
                  <Text style={tw("text-xs")}>
                    {failed[idx]?.map((course) => course).join(", ")}
                  </Text>
                </VCell>
              </View>
            </View>
          );
        })}
      </View>
    </Table>
  );
}
