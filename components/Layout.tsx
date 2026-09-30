import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion, useScroll } from "framer-motion";
import { Toaster } from "react-hot-toast";

function Layout({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <Toaster />
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <Navbar />
      <div className="main-wrapper">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
