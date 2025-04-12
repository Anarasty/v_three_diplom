import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react"; // maybe delete
import Hero from "../components/Home/Hero";
import Search from "../components/Home/Search";
import ItemList from "../components/Home/ItemList";

export default function Home() {
  return (
    <div className="px-3 px-sm-5 px-md-10 mt-5">
      <Hero/>
      <Search/>
      <ItemList/>
    </div>
  );
}
