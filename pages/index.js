import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect } from "react"; // maybe delete
import Hero from "../components/Home/Hero";
import Search from "../components/Home/Search";
import ItemList from "../components/Home/ItemList";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import app from '../shared/FirebaseConfig'
export default function Home() {

  const db = getFirestore(app);

  useEffect(()=>{
    getPost()
  },[])

  const getPost=async()=>{
    const querySnapshot = await getDocs(collection(db, "posts"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
  }

  return (
    <div className="px-3 px-sm-5 px-md-10 mt-5">
      <Hero/>
      <Search/>
      <ItemList/>
    </div>
  );
}
