import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";


import {
  Card,

  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export const Route = createFileRoute("/exam/$session/$semester")({
  component: Home,
});


const courses = [

  {
    courseCode: "116",
    courseName: "Structure Programmin",
    courseStatus: "completed",
    assignExaminer: "Dr. Hanif siddique",

  },
  {
    courseCode: "115",
    courseName: "EEE",
    courseStatus: "pending",
    assignExaminer: "Dr. Hanif siddique",

  },
  {
    courseCode: "118",
    courseName: "math",
    courseStatus: "completed",
    assignExaminer: "Dr. Hanif siddique",

  },
  {
    courseCode: "123",
    courseName: "fundamental of computer",
    courseStatus: "completed",
    assignExaminer: "Dr. Hanif siddique",

  },

];



function Home() {
  const { session, semester } = Route.useParams();
  return (
    <div className="m-20">

      <div className="mb-5 text-3xl "> {session} , {semester} semester all courses </div>
      <div className="flex flex-row flex-wrap gap-5">
        {
          courses.map((course) => (
            <Card
              onClick={() => {
                console.log(session, semester);
              }}
              className="w-[32%] h-fit bg-white shadow-md rounded-lg overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl"

            >
              <Link
                to={"/course/$session/$semester/$courseCode"}
                params={{
                  session: session,
                  semester: semester,
                  courseCode: course.courseCode
                }}
              >
                <CardHeader>
                  <CardTitle className="text-xl">
                    Course Name: <span className="font-normal"> {course.courseName}</span>
                  </CardTitle>
                  <CardTitle className="text-xl">
                    Course Code: <span className="font-normal"> {course.courseCode}</span>
                  </CardTitle>
                  <CardTitle className="text-xl">
                    Course status: <span className="font-normal"> {course.courseStatus}</span>
                  </CardTitle>


                </CardHeader>



              </Link>
            </Card>
          ))
        }
      </div>
    </div>
  );
}
