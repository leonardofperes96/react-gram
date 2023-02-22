import React from "react";
import { useUserContext } from "../contexts/UserContext";
import { useFetchPhotos } from "../hooks/useFetchPhotos";
import styles from "./UserFeed.module.css";
import { BsFillChatFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const UserFeed = () => {
  const { loading, error, data: photos } = useFetchPhotos("photos");
  const { data: user } = useUserContext();

  const filterUserPosts =
    photos && photos.filter((photo) => photo.userId === user.uid);


  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.image_container}>
      {filterUserPosts &&
        filterUserPosts.map((post) => (
          <div className={styles.hover_image_container} key={post.id}>
            <img src={post.image} alt={post.body} />
            <Link to={`/photo/${post.id}`} className={styles.link}>
              <BsFillChatFill className={styles.icon} />
            </Link>
          </div>
        ))}
    </div>
  );
};

export default UserFeed;
