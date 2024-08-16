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
        fem: 0,
        gpa: 0,
      },
      {
        course_id: 3,
        catm: 15.5,
        fem: 38,
        gpa: 3.4,
      },
      {
        course_id: 5,
        catm: 21.64,
        fem: 33,
        gpa: 3.7,
      },
      {
        course_id: 7,
        catm: 12.5,
        fem: 29,
        gpa: 3.2,
      },
      {
        course_id: 9,
        catm: 20,
        fem: 35,
        gpa: 3.8,
      },
      {
        course_id: 6,
        catm: 23,
        fem: 0,
        gpa: 3.8,
      },
      {
        course_id: 2,
        catm: 0,
        fem: 16,
        gpa: 3.1,
      },
      {
        course_id: 4,
        catm: 0,
        fem: 8,
        gpa: 0,
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
        gpa: 3.1,
      },
      {
        course_id: 6,
        catm: 24,
        fem: 0,
        gpa: 3.8,
      },
    ],
    courses: [
      {
        course_id: 1,
        catm: 18,
        fem: 42,
        gpa: 3.65,
      },
      {
        course_id: 3,
        catm: 15,
        fem: 38,
        gpa: 3.4,
      },
      {
        course_id: 5,
        catm: 21,
        fem: 33,
        gpa: 3.7,
      },
      {
        course_id: 7,
        catm: 12,
        fem: 29,
        gpa: 3.2,
      },
      {
        course_id: 4,
        catm: 0,
        fem: 22,
        gpa: 3.0,
      },
      {
        course_id: 2,
        catm: 0,
        fem: 20,
        gpa: 3.1,
      },
      {
        course_id: 6,
        catm: 0,
        fem: 22,
        gpa: 3.8,
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
        catm: 22,
        fem: 25,
        gpa: 3.0,
      },
      {
        course_id: 5,
        catm: 18,
        fem: 37,
        gpa: 3.4,
      },
      {
        course_id: 7,
        catm: 19,
        fem: 34,
        gpa: 3.6,
      },
      {
        course_id: 6,
        catm: 0,
        fem: 15,
        gpa: 3.5,
      },
      {
        course_id: 4,
        catm: 0,
        fem: 21,
        gpa: 3.7,
      },
      {
        course_id: 3,
        catm: 17,
        fem: 43,
        gpa: 3.7,
      },
      {
        course_id: 2,
        catm: 0,
        fem: 20,
        gpa: 3.2,
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
        gpa: 3.7,
      },
      {
        course_id: 6,
        catm: 0,
        fem: 19,
        gpa: 3.2,
      },
      {
        course_id: 7,
        catm: 19,
        fem: 34,
        gpa: 3.6,
      },
      {
        course_id: 4,
        catm: 21,
        fem: 0,
        gpa: 3.7,
      },
      {
        course_id: 5,
        catm: 18,
        fem: 37,
        gpa: 3.4,
      },
      {
        course_id: 2,
        catm: 0,
        fem: 23,
        gpa: 3.2,
      },
      {
        course_id: 1,
        catm: 20,
        fem: 23,
        gpa: 3.0,
      },
    ],
  },
];
