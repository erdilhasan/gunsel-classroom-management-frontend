import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";

export default function ClassDetailPage() {
  const location = useLocation();
  const [classJson, setClass] = useState({ id: "0", students: [] });
  const [studentList, setstudentList] = useState([]);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await fetch("http://localhost:3000/api/class/addStudent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        classId: classJson.id,
      }),
    });
    window.location.reload();
  };
  useEffect(() => {
    fetch("http://localhost:3000/api/class/viewClass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        primaryKey: location.state.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setClass(json);
        console.log(classJson);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/student/getAllStudent", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setstudentList(json);
        console.log(studentList);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="border p-2  my-4 w-fit m-auto items-center justify-between">
      <h1>{"Class Name: " + classJson.name}</h1>
      <h1>{"Number Of Students: " + classJson.noOfStudents}</h1>
      <div className="m-6">
        <h1>Add Student To Class:</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select {...register("studentId")}>
            {studentList.map((student, i) => (
              <option value={student.id} key={i}>
                {student.name}
              </option>
            ))}
          </select>
          <input type="submit" />
        </form>
      </div>
      <div className="m-4">
        <h1>Students:</h1>
        {classJson.students.map((student, i) => (
          <h1 key={i}>{"Name: " + student.name + " Age: " + student.age}</h1>
        ))}
      </div>
    </div>
  );
}
