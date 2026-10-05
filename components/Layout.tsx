import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion, useScroll, useSpring } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const BANNER_PAGES = ["/", "/about", "/careers", "/uaug", "/Insights"];

function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  return (
    <>
      <Toaster />
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Navbar />
      {/* Pages with a full-width banner run underneath the floating navbar; the rest clear it. */}
      <div className={BANNER_PAGES.includes(pathname) ? "" : "pt-[92px]"}>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
