import React, { useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import GlobalLoader from "./components/common/GlobalLoader.jsx";
import ShadowLoader from "./components/common/ShadowLoader.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import { useLenis } from "./hooks/useLenis.js";
import Layout from "./components/layout/Layout.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const Portfolio = lazy(() => import("./pages/Portfolio.jsx"));
const Quote = lazy(() => import("./pages/Quote.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useLenis(); // Initialize smooth scroll

  return (
    <ThemeProvider>
      <ScrollToTop />

      <AnimatePresence mode="wait">
        {loading && <GlobalLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <AnimatePresence mode="wait">
          <Suspense fallback={<ShadowLoader />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="services" element={<Services />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="quote" element={<Quote />} />

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </AnimatePresence>
      )}
    </ThemeProvider>
  );
}

export default App;
