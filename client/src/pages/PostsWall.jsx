import React, { useEffect, useState } from "react";
import { Post, BackToTopButton } from "../components";

const PostsWall = () => {
  const RenderCards = ({ data }) => {
    if (data?.length > 0) {
      return data.map((post) => (
        <div key={post._id}>
          <Post {...post} />
        </div>
      ));
    }
  };

  const [loading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full h-[100vh] mt-2 mb-2">
      <div className="flex justify-center flex-col float">
        <RenderCards data={posts} />
      </div>
      <BackToTopButton />
    </div>
  );
};

export default PostsWall;
