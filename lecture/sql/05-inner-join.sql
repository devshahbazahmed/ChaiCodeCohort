CREATE TABLE students (
  student_id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  branch VARCHAR(50),
)

CREATE TABLE profile (
  profile_id INT PRIMARY KEY,
  username VARCHAR(100),
  avatar_url VARCHAR(100),
  student_id INT REFERENCES students(student_id) ON DELETE CASCADE;

)

CREATE TABLE internships (
  internship_id INT PRIMARY KEY,
  company_name VARCHAR(100),
  role VARCHAR(100),
  status VARCHAR(100),
  stipend INT CHECK(stipend > 100),

  student_id INT REFERENCES students(student_id),
  )

  SELECT * 
  FROM students 
  INNER JOIN internships 
  ON students.student_id = internships.student_id;

  SELECT 
  students.name,
  students.branch,
  internships.company_name,
  internships.role,
  internships.stipend
  FROM students 
  INNER JOIN internships 
  ON students.student_id = internships.student_id;

 