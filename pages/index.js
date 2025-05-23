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
    setFilteredPosts(fetchedPosts); 
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
      setFilteredPosts(posts); 
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