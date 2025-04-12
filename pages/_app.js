import React from "react"; //maybe delete
import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react"


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </div>
  );
}

export default MyApp;
