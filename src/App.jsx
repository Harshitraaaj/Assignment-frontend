import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home";
import WorkDone from "./Pages/WorkDone";
import Error from "./Pages/Error"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="done" element={<WorkDone />} />
          <Route path="*" element={<Error />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
