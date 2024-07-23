import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Classes from "./pages/Classes";
import ClassDetailPage from "./pages/ClassDetailPage";
import Layout from "./pages/Layout";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import StudentDetailPage from "./pages/StudentDetailPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import ClassEditPage from "./pages/ClassEditPage";
import CourseEditPage from "./pages/CourseEditPage";
import StudentEditPage from "./pages/StudentEditPage";
import { onMessageListener, requestForToken } from "./config/firebase";
import toast, { Toaster } from "react-hot-toast";

function App() {
  requestForToken();

  onMessageListener()
    .then((payload) => {
      toast("New course available: " + payload.notification.title); //react-hot-toast package
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <BrowserRouter>
      <Routes>
        {" "}
        <Route path="/" element={<Layout />}>
          <Route path="/classes" element={<Classes />}></Route>
          <Route index element={<Classes />}></Route>
          <Route path="/classDetail" element={<ClassDetailPage />}></Route>
          <Route path="/editClass" element={<ClassEditPage />}></Route>
          <Route path="/editcourse" element={<CourseEditPage />}></Route>
          <Route path="/editStudent" element={<StudentEditPage />}></Route>
          <Route path="/studentDetail" element={<StudentDetailPage />}></Route>
          <Route path="/courseDetail" element={<CourseDetailPage />}></Route>
          <Route path="/students" element={<Students />}></Route>
          <Route path="/courses" element={<Courses />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
