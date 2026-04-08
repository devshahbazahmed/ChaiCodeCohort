  SELECT 
  students.name,
  students.branch,
  internships.company_name,
  internships.role,
  internships.stipend
  FROM students 
  FULL OUTER JOIN internships 
  ON students.student_id = internships.student_id;