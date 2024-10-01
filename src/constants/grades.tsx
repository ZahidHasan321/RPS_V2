import { markPerCredit } from "@/helper/consts";

//80% to 100% A+ 4.00
const Grades = [
  {
    grade: "A+",
    hmark: 100,
    lmark: 80,
    gpa: 4.0,
  },
  {
    grade: "A",
    hmark: 79,
    lmark: 75,
    gpa: 3.75,
  },
  {
    grade: "A-",
    hmark: 74,
    lmark: 70,
    gpa: 3.5,
  },
  {
    grade: "B+",
    hmark: 69,
    lmark: 65,
    gpa: 3.25,
  },
  {
    grade: "B",
    hmark: 64,
    lmark: 60,
    gpa: 3.0,
  },
  {
    grade: "B-",
    hmark: 59,
    lmark: 55,
    gpa: 2.75,
  },
  {
    grade: "C+",
    hmark: 54,
    lmark: 50,
    gpa: 2.5,
  },
  {
    grade: "C",
    hmark: 49,
    lmark: 45,
    gpa: 2.25,
  },
  {
    grade: "D",
    hmark: 44,
    lmark: 40,
    gpa: 2.0,
  },
  {
    grade: "F",
    hmark: 39,
    lmark: 0,
    gpa: 0,
  },
];

export function getLetterGrade(
  score: number | null | undefined,
  credit: number,
) {
  if (!score) {
    return " ";
  }

  const total = markPerCredit * credit;
  const parcentage = Math.ceil((score / total) * 100);

  const grade = Grades.find(
    (grade) => parcentage >= grade.lmark && parcentage <= grade.hmark,
  );

  return grade?.grade ?? " ";
}

export function getGPA(score: number, credit: number) {
  const total = markPerCredit * credit;
  const parcentage = Math.ceil((score / total) * 100);

  const grade = Grades.find(
    (grade) => parcentage >= grade.lmark && parcentage <= grade.hmark,
  );

  return grade?.gpa ?? 0;
}
