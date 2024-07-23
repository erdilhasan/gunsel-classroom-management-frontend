import { useEffect, useState } from "react";
import ClassTile from "../components/ClassTile";
import { useForm } from "react-hook-form";
import StudentTile from "../components/StudentTile";

export default function Students() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await fetch("http://localhost:3000/api/student/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => setClassList(json))
      .catch((error) => console.error(error));
    window.location.reload();
  };

  const [studentList, setClassList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/student/getAllStudent")
      .then((response) => response.json())
      .then((json) => setClassList(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="m-auto w-max">
      <div className="justify-between my-4 w-auto m-auto mx-2 flex">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Create Student:</h1>
          <label>Name: </label>
          <input {...register("name", { required: true })}></input>
          <label>Age: </label>
          <input {...register("age", { required: true })}></input>
          <button className="m-2 border rounded-md p-1" type="submit">
            Add
          </button>
        </form>
      </div>
      <h1>Students:</h1>
      {studentList.map((classJson, i) => (
        <StudentTile key={i} classJson={classJson}></StudentTile>
      ))}
    </div>
  );
}
