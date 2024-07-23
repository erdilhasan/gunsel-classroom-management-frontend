import { useNavigate } from "react-router";

/* eslint-disable react/prop-types */
export default function ClassTile({ classJson }) {
  const navigate = useNavigate();

  async function deleteClass() {
    await fetch("http://localhost:3000/api/class/deleteClass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ primaryKey: classJson.id }),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
    window.location.reload();
  }

  return (
    <div className="border border-[EEEEEE] p-2 flex my-4 w-auto m-auto items-center justify-between bg-[#31363F] rounded-md shadow-2xl">
      <h1 className="m-2 text-center justify-center content-center flex-1 ">
        {classJson.name}
      </h1>
      <p className="m-2">{classJson.created_at.slice(0, 10)}</p>
      <button
        onClick={() => navigate("/classDetail", { state: classJson })}
        className="m-2 border rounded-md p-2"
      >
        View
      </button>
      <button
        onClick={() => navigate("/editclass", { state: classJson })}
        className="m-2 border rounded-md p-2"
      >
        Edit
      </button>
      <button onClick={deleteClass} className="m-2 border rounded-md p-2">
        Delete
      </button>
    </div>
  );
}
