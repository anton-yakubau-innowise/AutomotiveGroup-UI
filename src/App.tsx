import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { VehicleCatalog } from "./features/vehicles/components/VehicleCatalog";
import { UserDashboard } from "./components/UserDashboard";
import { Toaster } from "./components/ui/sonner";
import { ShowroomList } from "./features/showrooms/components/ShowroomList";
import { VehicleDetailsRoute } from "./features/vehicles/components/VehicleDetailsRoute";
import { HomePage } from "./pages/HomePage";

export default function App() {
  const AboutPage = () => <div className="p-8">About Page Content</div>;
  const ServicesPage = () => <div className="p-8">Services Page Content</div>;
  const ContactPage = () => <div className="p-8">Contact Page Content</div>;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/showrooms" element={<ShowroomList />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/vehicles/:id" element={<VehicleDetailsRoute />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}
