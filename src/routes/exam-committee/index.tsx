import { createFileRoute } from "@tanstack/react-router";


const examCommittee = {
  course1: {
    courseName: "Introduction to JavaScript",
    courseCode: "JS101",
    examiners: ["Dr. Smith", "Prof. Johnson"],
    courseTeacher: "Ms. Davis",
    totalStudents: 30,
    status: "complete"
  },
  course2: {
    courseName: "Data Structures and Algorithms",
    courseCode: "DSA202",
    examiners: ["Dr. Brown", "Prof. Lee"],
    courseTeacher: "Mr. White",
    totalStudents: 25,
    status: "pending"
  },
  course3: {
    courseName: "Introduction to Machine Learning",
    courseCode: "ML303",
    examiners: ["Dr. Garcia", "Prof. Wang"],
    courseTeacher: "Mrs. Martinez",
    totalStudents: 40,
    status: "complete"
  },
  course4: {
    courseName: "Introduction to Python",
    courseCode: "PY101",
    examiners: ["Dr. Rodriguez", "Prof. Chen"],
    courseTeacher: "Mr. Black",
    totalStudents: 20,
    status: "pending"
  },
  course5: {
    courseName: "Web Development",
    courseCode: "WEB202",
    examiners: ["Dr. Kim", "Prof. Patel"],
    courseTeacher: "Ms. White",
    totalStudents: 35,
    status: "complete"
  },
  course6: {
    courseName: "Database Management",
    courseCode: "DBM303",
    examiners: ["Dr. Thompson", "Prof. Gupta"],
    courseTeacher: "Mr. Johnson",
    totalStudents: 28,
    status: "complete"
  },
  // Add more courses as needed
};


const Home = () => {
  const courses = Object.values(examCommittee);

  return (
    <div className="container mx-auto p-8">
      <h1>
        <title>Exam Committee Data</title>
      </h1>
      <h1 className="text-3xl font-bold mb-4">Exam Committee Data</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course, index) => (
          //  <Link key={index} to={`/committee/`} className="hover:no-underline">
          <div key={index} className="bg-blue-100 p-4 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
            <strong className="text-blue-700">Course Name:</strong> {course.courseName}<br />
            <strong className="text-blue-700">Course Code:</strong> {course.courseCode}<br />
            <strong className="text-blue-700">Examiners:</strong> {course.examiners.join(', ')}<br />
            <strong className="text-blue-700">Course Teacher:</strong> {course.courseTeacher}<br />
            <strong className="text-blue-700">Total Students:</strong> {course.totalStudents}<br />
            <strong className="text-blue-700">Status:</strong> {course.status}
          </div>
          //    </Link>
        ))}
      </div>
    </div>
  );

};

export const Route = createFileRoute("/exam-committee/")({
  component: Home,
});
