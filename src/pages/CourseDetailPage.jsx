import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function CourseDetailPage() {
  const location = useLocation();
  const [courseJson, setCourse] = useState({ id: "0", students: [] });
  useEffect(() => {
    fetch("http://localhost:3000/api/course/viewCourse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        primaryKey: location.state.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setCourse(json);
        console.log(courseJson);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="border p-2  my-4 w-fit m-auto items-center justify-between">
      <h1>{"Course Name: " + courseJson.name}</h1>
      <h1>{"Number Of Students: " + courseJson.noOfStudents}</h1>
      <div className="m-4">
        <h1>Students:</h1>
        {courseJson.students.map((student, i) => (
          <h1 key={i}>{"Name: " + student.name + " Age: " + student.age}</h1>
        ))}
      </div>
    </div>
  );
}
