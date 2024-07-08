import { createFileRoute } from '@tanstack/react-router'



import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useState } from 'react';

export const Route = createFileRoute('/course/$session/$semester/$courseCode')({
  component: Home,

});




function Home() {

  const content = ["sopon", "jahid", "ramim", "miskat"]


  const course = {
    courseCode: "116",
    courseName: "Structure Programmin",
    courseStatus: "completed",
    setAExaminer: "Dr. Hanif siddique",
    setBExaminer: "",

  };

  const [currentContent, setCurrentContent] = useState(content[0]);
  const [color, setColor] = useState("");





  const { session, semester, courseCode } = Route.useParams();
  return <div className='mt-10'>
    <Card className='w-2/4 m-auto' onClick={() => {
      console.log(session, semester, courseCode)
    }}>
      <CardHeader>
        <CardTitle className='text-4xl text-center '>
          Course Info
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-bold mr-1">Course Code : </span> <span> {course.courseCode}</span>

        </p>
        <p>
          <span className="font-bold mr-1">Course Name : </span> <span> {course.courseName}</span>

        </p>
        <p>
          <span className="font-bold mr-1">Course Status : </span> <span> {course.courseStatus}</span>

        </p>


        <p>
          <span className="font-bold mr-1">Set A Examiner : </span> {course.setAExaminer == "" ? <span className='hover:cursor-pointer	text-blue-600 font-bold' onClick={() => {
            alert("hello")

          }}>click here to assign examiner</span> : <span>{course.setAExaminer}</span>}

        </p>
        <p>
          <span className="font-bold mr-1">Set B Examiner : </span> {course.setBExaminer == "" ? <span className='hover:cursor-pointer text-blue-600 font-bold' onClick={() => {
            alert("hello")

          }}>click here to assign examiner</span> : <span>{course.setBExaminer}</span>}

        </p>

      </CardContent>

    </Card>
    <div className='w-1/2 m-auto border-2  rounded-xl	mt-10'>
      <div className='w-7/12 m-auto'>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="flex flex-wrap items-center  mx-auto p-4">

            <div className="">
              <ul className="font-medium  flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a onClick={() => {
                    setCurrentContent(content[0]);
                    setColor("text-blue-700")


                  }}
                    href="#"
                    className={color + 'block py-2 px-3  bg-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500'}

                  >
                    Decode
                  </a>
                </li>
                <li>
                  <a onClick={() => {
                    setCurrentContent(content[1]);
                    setColor("text-blue-700")


                  }}
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    set-a paper
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      setCurrentContent(content[2]);
                      setColor("text-blue-700")


                    }}
                    href="#"
                    className={color + 'block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}
                  >
                    set-b paper
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      setCurrentContent(content[3]);
                      setColor("text-blue-700")


                    }}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    catm
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </div>

      <hr className='border-2	border-black	 mb-5' />
      <div className='h-48 w-10/12 m-auto  p-5'>

        <p>{currentContent}</p>
      </div>

    </div>
  </div>

}