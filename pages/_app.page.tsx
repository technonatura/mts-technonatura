import "tailwindcss/tailwind.css";

import Head from "next/head";
import { useEffect } from "react";
import * as gtag from "../utils/gtag";
import { useRouter } from "next/router";
import ProgressLoad from "../components/ProgressLoad";

export function reportWebVitals({ id, name, label, value }) {
  window.gtag("event", name, {
    event_category: label === "web-vital" ? "Web Vitals" : "Next.js metric",
    value: Math.round(name === "CLS" ? value * 1000 : value),
    event_label: id,
    non_interaction: true
  });
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="google-site-verification"
          content={
            gtag.GOOGLE_VERIF || "pYKlXre7UF2sT8gpx6Nf8NKJLM0H5hkh80XIWEmO-yo"
          }
        />
        <meta name="theme-color" content="#f0efeb" />
      </Head>
      <ProgressLoad />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;