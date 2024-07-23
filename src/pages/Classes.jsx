import { useEffect, useState } from "react";
import ClassTile from "../components/ClassTile";
import { useForm } from "react-hook-form";

export default function Classes() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await fetch("http://localhost:3000/api/class/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => setClassList(json))
      .catch((error) => console.error(error));
    window.location.reload();
  };

  const [classList, setClassList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/class/getAllClass")
      .then((response) => response.json())
      .then((json) => setClassList(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="  content-center  justify-center items-center w-max m-auto ">
      <div className="justify-between my-4 w-auto m-auto mx-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Create Class:</h1>
          <label>Name: </label>
          <input {...register("name", { required: true })}></input>
          <button className="m-2 border rounded-md p-1" type="submit">
            Add
          </button>
        </form>
      </div>
      <h1>Classes:</h1>
      <div className="grid-cols-2">
        {" "}
        {classList.map((classJson, i) => (
          <ClassTile key={i} classJson={classJson}></ClassTile>
        ))}
      </div>
    </div>
  );
}
