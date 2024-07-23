import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";

export default function StudentDetailPage() {
  const location = useLocation();
  const [classJson, setStudent] = useState({ id: "0", courses: [] });
  const [courses, setCourses] = useState([]);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await fetch("http://localhost:3000/api/student/enrollCourse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        studentId: classJson.id,
      }),
    });
    window.location.reload();
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/course/getAllCourse", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setCourses(json);
        console.log(courses);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/student/viewStudent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        primaryKey: location.state.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setStudent(json);
        console.log(classJson);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="border p-2  my-4 w-fit m-auto items-center justify-between">
      <h1>{"Student Name: " + classJson.name}</h1>
      <h1>{"Age: " + classJson.age}</h1>
      <h1>{"Number Of Courses: " + classJson.noOfCourses}</h1>

      <div className="m-6">
        <h1>Enroll To a Course:</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select {...register("courseId")}>
            {courses.map((student, i) => (
              <option value={student.id} key={i}>
                {student.name}
              </option>
            ))}
          </select>
          <input type="submit" />
        </form>
      </div>

      <div className="m-4">
        <h1>Courses:</h1>
        {classJson.courses.map((course, i) => (
          <h1 key={i}>{"Name: " + course.name}</h1>
        ))}
      </div>
    </div>
  );
}
