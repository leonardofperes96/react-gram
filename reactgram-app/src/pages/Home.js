import React from "react";
import { useFetchPhotos } from "../hooks/useFetchPhotos";
import { BsFillChatFill } from "react-icons/bs";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const { data, loading, error } = useFetchPhotos("photos");

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.home_container}>
      {data &&
        data.map((post) => (
          <div key={post.id} className={styles.home_post_container}>
            <div className={styles.home_post_body}>
              <h3>@{post.username}</h3>
              <img src={post.image} alt={post.body} />
              <div className={styles.home_post_options}>
                <Link to={`/photo/${post.id}`}>
                  {" "}
                  <BsFillChatFill className={styles.post_options_icon} />
                </Link>
              </div>
              <p>
                <strong>{post.username}</strong> {post.body}
              </p>
              <p>{post.hashtags}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
