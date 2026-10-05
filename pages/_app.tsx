import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import "@/styles/hexaid.scss";
import type { AppProps } from "next/app";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });
import { useRouter } from "next/router";
import Head from "next/head";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Script from "next/script";
import { EASE } from "@/components/ui/motion";

const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-display",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // AOS still drives the pages that have not moved to Framer Motion yet.
  useEffect(() => {
    Aos.init({});
    const refresh = () => Aos.refresh();
    document.addEventListener("scroll", refresh, { capture: true, passive: true });
    return () => document.removeEventListener("scroll", refresh, { capture: true });
  }, []);

  useEffect(() => {
    const start = () => NProgress.start();
    const done = () => NProgress.done();
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
    };
  }, [router.events]);

  return (
    <div className={`${body.variable} ${display.variable} font-sans`}>
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

      <MotionConfig reducedMotion="user">
        <Layout>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={router.asPath.split("?")[0]}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </MotionConfig>
    </div>
  );
}
