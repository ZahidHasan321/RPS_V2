import secureAxios from "@/lib/interceptor";
import { ExamDetails } from "@/type";

export async function getExamDetails(exam_id: string): Promise<ExamDetails> {
  const data = await secureAxios
    .get(`/exam/${exam_id}`)
    .then((res) => res.data);
  return data;
}

//courses are from 1-8 and course_id cannot be repeated in an array
//courses field must have all courses
//gpa, fem & catm cannot be null
export const studentData = [
  {
    student_id: 987654,
    student_name: "John Doe",
    hall_name: "Zahirul Islam Hall",
    session: "2020",
    student_status: "Regular",
    courses: [
      {
        course_id: 1,
        catm: 18.02,
        fem: 18,
        credit: 3,
      },
      {
        course_id: 3,
        catm: 15.5,
        fem: 38,
        credit: 3,
      },
      {
        course_id: 5,
        catm: 21.64,
        fem: 33,
        credit: 3,
      },
      {
        course_id: 7,
        catm: 12.5,
        fem: 29,
        credit: 3,
      },
      {
        course_id: 9,
        catm: 20,
        fem: 35,
        credit: 3,
      },
      {
        course_id: 6,
        catm: 23,
        fem: 0,
        credit: 3,
      },
      {
        course_id: 2,
        catm: 0,
        fem: 16,
        credit: 3,
      },
      {
        course_id: 4,
        catm: 0,
        fem: 8,
        credit: 2,
      },
    ],
  },
  {
    student_id: 123456,
    student_name: "Jane Smith",
    hall_name: "Ruqayyah Hall",
    session: "2020",
    student_status: "Improvement",
    improves: [
      {
        course_id: 2,
        catm: 0,
        fem: 19, // Randomly assign a mark (can modify logic for improvement)
        credit: 3,
      },
      {
        course_id: 6,
        catm: 24,
        fem: 0,
        credit: 3,
      },
    ],
    courses: [
      {
        course_id: 1,
        catm: 18,
        fem: 42,
        credit: 3,
      },
      {
        course_id: 3,
        catm: 15,
        fem: 38,
        credit: 3,
      },
      {
        course_id: 5,
        catm: 21,
        fem: 33,
        credit: 3,
      },
      {
        course_id: 7,
        catm: 12,
        fem: 29,
        credit: 3,
      },
      {
        course_id: 4,
        catm: 0,
        fem: 22,
        credit: 2,
      },
      {
        course_id: 2,
        catm: 0,
        fem: 20,
        credit: 2,
      },
      {
        course_id: 6,
        catm: 0,
        fem: 22,
        credit: 3,
      },
    ],
  },
  {
    student_id: 234567,
    student_name: "Ali Ahmed",
    hall_name: "Surjahmuddin Hall",
    session: "2020",
    student_status: "Regular",
    courses: [
      {
        course_id: 1,
        credit: 3,
        catm: 22,
        fem: 25,
      },
      {
        course_id: 5,
        credit: 3,
        catm: 18,
        fem: 37,
      },
      {
        course_id: 7,
        credit: 3,
        catm: 19,
        fem: 34,
      },
      {
        course_id: 6,
        catm: 0,
        credit: 3,
        fem: 15,
      },
      {
        course_id: 4,
        catm: 0,
        fem: 21,
        credit: 2,
      },
      {
        course_id: 3,
        catm: 17,
        fem: 43,
        credit: 3,
      },
      {
        course_id: 2,
        catm: 0,
        fem: 20,
        credit: 2,
      },
    ],
  },
  {
    student_id: 567890,
    student_name: "Fatima Khan",
    hall_name: "Shaheed Suhrawardy Hall",
    session: "2020",
    student_status: "Regular",
    courses: [
      {
        course_id: 3,
        catm: 17,
        fem: 43,
        credit: 3,
      },
      {
        course_id: 6,
        catm: 0,
        fem: 19,
        credit: 3,
      },
      {
        course_id: 7,
        catm: 19,
        fem: 34,
        credit: 3,
      },
      {
        course_id: 4,
        catm: 21,
        fem: 0,
        credit: 2,
      },
      {
        course_id: 5,
        catm: 18,
        fem: 37,
        credit: 3,
      },
      {
        course_id: 2,
        catm: 0,
        fem: 23,
        credit: 2,
      },
      {
        course_id: 1,
        catm: 20,
        fem: 23,
        credit: 2,
      },
    ],
  },
];
