import Navbar from "./Navbar.jsx";
import Footer from "../sections/Footer.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-color)]">
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        {/* Outlet acts as a placeholder that renders the matched child route components */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
