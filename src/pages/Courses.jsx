import { useEffect, useState } from "react";
import ClassTile from "../components/ClassTile";
import { useForm } from "react-hook-form";
import StudentTile from "../components/StudentTile";
import CourseTile from "../components/CourseTile";

export default function Courses() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await fetch("http://localhost:3000/api/course/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      //  .then((json) => setCourseList(json))
      .catch((error) => console.error(error));
  };

  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/course/getAllCourse")
      .then((response) => response.json())
      .then((json) => setCourseList(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="m-auto w-max">
      <div className="justify-between my-4 w-auto m-auto mx-2 flex">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Create Course:</h1>
          <label>Name: </label>
          <input {...register("name", { required: true })}></input>
          <button className="m-2 border rounded-md p-1" type="submit">
            Add
          </button>
        </form>
      </div>
      <h1>Courses:</h1>
      {courseList.map((classJson, i) => (
        <CourseTile key={i} classJson={classJson}></CourseTile>
      ))}
    </div>
  );
}
