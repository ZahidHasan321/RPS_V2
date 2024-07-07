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

export interface ExamDateType {
  exam_id: number;
  department_id: number;
  academic_session_id: number;
  exam_name: string;
  exam_centre: string;
  exam_session: string;
  exam_start_date: string | DataTransferItemList; // Assuming ISO 8601 format for date-time
  exam_end_date?: string | Date; // Explicitly set as null
  is_result_submitted: number;
  result_submit_date?: string | Date; // Explicitly set as null
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
}
