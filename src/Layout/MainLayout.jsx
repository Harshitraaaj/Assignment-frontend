import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer";
import BackToTopButton from "../Components/BackToTopButton"; // Import it here

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Outlet />
      </main>
      <BackToTopButton /> 
      <Footer />
    </>
  );
}
