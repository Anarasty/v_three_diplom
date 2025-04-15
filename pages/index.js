// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
// import React, { useEffect, useState } from "react"; // maybe delete
// import Hero from "../components/Home/Hero";
// import Search from "../components/Home/Search";
// import ItemList from "../components/Home/ItemList";
// import Posts from "../components/Home/Posts";
// import {
//   getFirestore,
//   doc,
//   setDoc,
//   getDoc,
//   collection,
//   getDocs,
// } from "firebase/firestore";
// import app from "../shared/FirebaseConfig";

// export default function Home() {
//   const db = getFirestore(app);
//   const [posts, setPosts] = useState([]);
//   useEffect(() => {
//     getPost();
//   }, []);

//   const getPost = async () => {
//     const querySnapshot = await getDocs(collection(db, "posts"));
//     querySnapshot.forEach((doc) => {
//       // console.log(doc.id, " => ", doc.data());
//       setPosts((posts) => [...posts, doc.data()]);
//     });
//   };

//   return (
//     <div className="px-3 px-sm-5 px-md-10 mt-5">
//       <Hero />
//       <Search />
//       <ItemList />
//       {posts ? <Posts posts={posts} /> : null}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import Hero from "../components/Home/Hero";
import Search from "../components/Home/Search";
import ItemList from "../components/Home/ItemList";
import Posts from "../components/Home/Posts";
import {
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import app from "../shared/FirebaseConfig";

export default function Home() {
  const db = getFirestore(app);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const fetchedPosts = [];
    querySnapshot.forEach((doc) => {
      fetchedPosts.push(doc.data());
    });
    setPosts(fetchedPosts);
    setFilteredPosts(fetchedPosts); // по умолчанию показываем все
  };

  const handleSelectCategory = (category) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    if (newCategory) {
      const filtered = posts.filter(
        (post) => post.itemCategory === newCategory
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts); // сброс фильтра
    }
  };

  return (
    <div className="px-3 px-sm-5 px-md-10 mt-5">
      <Hero />
      <Search posts={posts} setFilteredPosts={setFilteredPosts} />
      <ItemList
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />
      {filteredPosts && <Posts posts={filteredPosts} />}
    </div>
  );
}