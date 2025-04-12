import React from "react"; //maybe delete
import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
