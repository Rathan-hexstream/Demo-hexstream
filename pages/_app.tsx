import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import "@/styles/hexaid.scss";
import type { AppProps } from "next/app";
import { DM_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });
import Router, { useRouter } from "next/router";
import Loader from "@/components/reusable/Loader";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Script from "next/script";

const font = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const variants = {
  fadeIn: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  inactive: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  fadeOut: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    Aos.init({});
    document.addEventListener(
      "scroll",
      (e) => {
        Aos.refresh();
      },
      { capture: true, passive: true }
    );
    return () =>
      document.removeEventListener("scroll", (e) => {
        Aos.refresh();
      });
  }, []);

  Router.events.on("routeChangeStart", (url) => {
    setloading(true);
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", (url) => {
    setloading(false);
    NProgress.done();
  });

  useEffect(() => {
    Aos.init({});
    document.addEventListener(
      "scroll",
      (e) => {
        Aos.refresh();
      },
      { capture: true, passive: true }
    );
    return () =>
      document.removeEventListener("scroll", (e) => {
        Aos.refresh();
      });
  }, []);

  return (
    <div className={font.className}>
      <Head>
        <title>
          {"HEXstream–The global leader in data integration and analytics for the utility industry."}
        </title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        {/* OG Tags */}
        <meta
          property="og:title"
          content={
            "HEXstream–The global leader in data integration and analytics for the utility industry."
          }
        />
        <meta property="og:url" content={`https://hexstream.com/`} />
        {/* <meta
          property="og:image"
          content="https://res.cloudinary.com/inradiuscloud/image/upload/v1675864181/Static/Share_URL_up3n5w.jpg"
        /> */}
        <meta property="og:type" content="business" />
        <meta
          property="og:description"
          content={
            "Welcome to HEXstream, the industry leader in utilities management solutions. Experience cutting-edge technology designed to revolutionize your utilities operations."
          }
        />
        <meta name="twitter:card" content="summary" />
        <meta
          property="twitter:title"
          content={
            "HEXstream-The global leader in data integration and analytics for the utility industry."
          }
        />
        <meta
          property="twitter:description"
          content={
            "HEXstream delivers utility data analytics that translate operational data into real-time actionable business intelligence."
          }
        />
        <meta property="twitter:url" content={`https://hexstream.com/`} />
        {/* <meta
          property="twitter:image"
          content="https://res.cloudinary.com/inradiuscloud/image/upload/v1675864181/Static/Share_URL_up3n5w.jpg"
        /> */}
        <script
          src="https://embed.tawk.to/65130e890f2b18434fdabb84/1hb971ir5"
          async
        ></script>
      </Head>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        id="google-tags"
        strategy="lazyOnload"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-FSTKK4GE2L"
      ></Script>

      <Script id="google-tags-2" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FSTKK4GE2L');`}
      </Script>

      <Layout>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={router.asPath}
            variants={variants}
            initial="fadeIn"
            animate="inactive"
            exit="fadeOut"
          >
            {/* {loading && <Loader />} */}
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </div>
  );
}
