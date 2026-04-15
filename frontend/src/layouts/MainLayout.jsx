import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingDonateButton from "../components/FloatingDonateButton";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        className="grow"
        style={{ paddingTop: "var(--app-nav-height, 120px)" }}
      >
        <Outlet />
      </main>
      <Footer />
      <FloatingDonateButton />
    </div>
  );
};

export default MainLayout;
