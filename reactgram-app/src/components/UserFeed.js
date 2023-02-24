import React from "react";
import { useUserContext } from "../contexts/UserContext";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import styles from "./UserFeed.module.css";
import { BsFillChatFill } from "react-icons/bs";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useDeleteDocument } from "../hooks/useDeleteDocument";

const UserFeed = () => {
  const { loading, error, data: photos } = useFetchDocuments("photos");
  const { data: user } = useUserContext();
  const { deleteDocument } = useDeleteDocument("photos");

  const filterUserPosts =
    photos && photos.filter((photo) => photo.userId === user.uid);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const noPhotos =
    photos && photos.length < 1 ? (
      <h2>
        Você ainda não postou
        <br />
        <Link style={{color: '#fb1'}}to="/user/post">Poste agora</Link>
      </h2>
    ) : (
      ""
    );

  return (
    <div className={styles.image_container}>
      {noPhotos}
      {filterUserPosts &&
        filterUserPosts.map((post) => (
          <div className={styles.hover_image_container} key={post.id}>
            <img src={post.image} alt={post.body} />
            <div className={styles.links}>
              <div>
                <BiTrash
                  onClick={() => deleteDocument(post.id)}
                  className={styles.icon}
                />
              </div>
              <Link to={`/photo/${post.id}`} className={styles.link}>
                <BsFillChatFill className={styles.icon} />
              </Link>
              <Link to={`/edit-post/${post.id}`} className={styles.link}>
                <BiEdit className={styles.icon} />
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserFeed;
