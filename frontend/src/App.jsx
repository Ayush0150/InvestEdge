import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./Components/landing_page/about/AboutPage";
import Footer from "./Components/landing_page/Footer";
import HomePage from "./Components/landing_page/home/HomePage";
import Login from "./Components/landing_page/login/login";
import Navbar from "./Components/landing_page/Navbar";
import NotFound from "./Components/landing_page/NotFound";
import PricingPage from "./Components/landing_page/pricing/PricingPage";
import ProductPage from "./Components/landing_page/products/ProductPage";
import Signup from "./Components/landing_page/signup/Signup";
import SupportPage from "./Components/landing_page/support/SupportPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
