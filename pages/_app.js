import React from "react"; //maybe delete
import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <div className="test-class">
      Tailwind працює?
    </div>
      <Footer />
    </div>
  );
}

export default MyApp;
