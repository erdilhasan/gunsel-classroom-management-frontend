import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";

export default function CourseEditPage() {
  const location = useLocation();
  const [classJson, setClass] = useState({ id: "0", students: [] });
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await fetch("http://localhost:3000/api/course/updateCourse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updated: data,
        primaryKey: classJson.id,
      }),
    });
    window.location.reload();
  };
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
        setClass(json);
        console.log(classJson);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="border p-2   my-4 w-fit m-auto items-center justify-between ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-fit">
        <label>Class Name:</label>
        <input defaultValue={classJson.name} {...register("name")}></input>

        <button className="m-2 border rounded-md p-1" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
