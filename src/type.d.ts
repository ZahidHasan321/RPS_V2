export type multiComboBoxItem = {
  idx: number;
  label: string;
  value: string;
  role?: "Chairman" | "Member" | "Tabulator";
};

export type AcademicSessionDataType = {
  academic_session_id: number;
  session: string;
  semester: number;
  program_id: number;
};

export type ExamDetails = {
  exam_id: number;
  department_id: number;
  academic_session_id: number;
  exam_name: string;
  exam_centre: string;
  exam_session: string;
  exam_start_date: string;
  exam_end_date: string;
  is_result_submitted: number;
  result_submit_date: string;
  committee_created: number;
  department_name: string;
  university_id: number;
  faculty: string;
  undergrad_semester_no: number;
  grad_semester_no: number;
  department_abbr: string;
  session: string;
  semester: number;
  program_id: number;
  program_name: string;
  program_abbr: string;
  is_result_completed: number;
};

export type CourseData = {
  course_id: number;
  academic_session_id: number;
  result_status: "Unassigned" | "Pending" | "Completed";
  result_submit_date: string;
  is_catm_submitted: number;
  catm_submit_date: string | null;
  is_decoded: number;
  department_id: number;
  course_code: string;
  course_title: string;
  credit: number;
  course_type: string;
  exam_minutes: number;
  program_name: string;
  program_abbr: string;
  department_abbr: string;
  department_name: string;
  examiner_no: number;
  examiner_submitted: number;
};

export type TeacherDataType = {
  user_id: string;
  department_id: number;
  teacher_id: number;
  title: string;
  designation: string;
  area_of_interest: string;
  profile_image_id: number;
  sign_id: number;
  permanent_address_id: number;
  email: string;
  phone: string;
  first_name_bn: string;
  last_name_bn: string;
  first_name: string;
  last_name: string;
  dob: string | Date;
  gender: string;
  blood_group: string;
  religion: string;
  ethnicity: string;
  nationality: string;
  password: string; // Consider security implications of storing passwords in plain text
  present_address_id: number;
};

export type PaperData = {
  exam_id: number;
  course_id: number;
  teacher_id: number;
  set: string;
  assigned_date: string;
  is_submitted: number;
  submit_date: string | null;
  department_id: number;
  course_code: string;
  course_title: string;
  credit: number;
  course_type: string;
  exam_minutes: number;
  exam_name: string;
  exam_session: string;
  department_abbr: string;
  semester: number;
  department_name: string;
};

export type PaperMark = {
  paper_code: number | null;
  q1: number | null;
  q2: number | null;
  q3: number | null;
  q4: number | null;
  q5: number | null;
  q6: number | null;
  q7: number | null;
  q8: number | null;
  q9: number | null;
  q10: number | null;
  q11: number | null;
  q12: number | null;
  q13: number | null;
  q14: number | null;
  q15: number | null;
};

export type CatmItem = {
  course_id: number;
  department_id: number;
  course_code: string;
  course_title: string;
  credit: number;
  course_type: string;
  exam_minutes: number;
  session: string;
  exam_session: string;
  semester: number;
  department_abbr: string;
  department_name: string;
  is_catm_submitted: number;
  program_name: string;
  program_abbr: string;
  exam_id: number;
  academic_session_id: number;
};

export type catmTableDataType = {
  student_id: number;
  ct_mark: number;
  attendance_mark: number;
};

export type courseTeacherType = {
  designation: string | null;
  title: string | null;
  email: string;
  first_name: string;
  last_name: string;
  department_abbr: string;
  department_name: string;
  faculty: string;
  is_catm_submitted: number;
};

export type tabulationExamCommitee = {
  role: "Chairman" | "Member" | "Tabulator";
  first_name: string;
  last_name: string;
  title: string | null;
};

export type TabulationStudentDataType = {
  student_id: number;
  student_name: string;
  hall_name: string;
  session: string;
  student_status: string;
  courses: Map<
    number,
    {
      catm: number | null;
      fem: number | null;
      credit: number;
      gpa: number | null;
      total: number | null;
    }
  >;
  improves?: Map<
    number,
    {
      catm: number | null;
      fem: number | null;
      credit: number;
      gpa: number | null;
      total: number | null;
    }
  >;
}[];

export type User = {
  permanent_address_id: number;
  present_address_id: number;
  blood_group: string | null;
  dob: Date;
  email: string;
  ethnicity: string | null;
  first_name: string;
  first_name_bn: string | null;
  gender: string | null;
  last_name: string;
  last_name_bn: string | null;
  nationality: string | null;
  phone: string | null;
  profile_image_id: number | null;
  religion: string | null;
  sign_id: number | null;
  user_id: string;
  teacher_id: number | undefined;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (teacher_id: number, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export type Course = {
  course_code: string;
  course_id: number;
  course_title: string;
  course_type: "Lab" | "Project" | "Theory" | "Thesis" | "Viva" | null;
  credit: number;
  department_id: number;
  exam_minutes: number;
  department: {
    department_id: number;
    department_abbr: string;
    department_name: string;
    faculty: string;
    grad_semester_no: number;
    undergrad_semester_no: number;
    university_id: number;
  };
};

export type CourseResponse = {
  student_status: "Improvement" | "Irregular" | "Regular";
  student_id: number;
  catm: {
    ct_mark: number;
    attendance_mark: number;
  };
  setA_mark: number | null;
  setB_mark: number | null;
  setA_paper_code: number | null;
  setB_paper_code: number | null;
};
