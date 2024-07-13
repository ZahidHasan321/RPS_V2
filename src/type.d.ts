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
