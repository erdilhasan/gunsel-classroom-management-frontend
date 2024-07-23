import { Toaster } from "react-hot-toast";
import { Outlet, Link } from "react-router-dom";
import { requestForToken } from "../config/firebase";

const Layout = () => {
  return (
    <>
      {" "}
      <Toaster></Toaster>
      <button
        onClick={() => {
          requestForToken().then(() => window.location.reload());
        }}
      >
        Enable Notifications
      </button>
      <nav className=" shadow-md bg-[#31363F]  items-center justify-center p-2">
        <ul className="flex w-1/3 justify-around items-center m-auto">
          <li>
            <Link to="/classes">Classes</Link>
          </li>
          <li>
            <Link to="/students">Students</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
