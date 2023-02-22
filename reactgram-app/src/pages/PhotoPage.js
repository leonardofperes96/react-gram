import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import PostComment from "../components/PostComment";
import { useUserContext } from "../contexts/UserContext";
import { useFetchPhoto } from "../hooks/useFetchPhoto";
import { useInsertPhotos } from "../hooks/useInsertPhotos";
import styles from "./PhotoPage.module.css";

const PhotoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { document: posts } = useFetchPhoto("photos", id);
  const { insertDocument } = useInsertPhotos("comments");
  const { data, loading, error } = useUserContext();
  const [comment, setComment] = useState("");
  const username = data && data.displayName;
  const userCommentId = data && data.uid;

  const handleInsertComment = (e) => {
    e.preventDefault();

    const data = {
      comment,
      userComment: username,
      commentId: id,
      userCommentId,
    };

    insertDocument(data);

    setComment("");
  };

  function handleOutsideClick(event) {
    if(event.target === event.currentTarget) {
      navigate((-1))
    }
}

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {posts && (
        <div className={styles.modal_content}>
          <h3 className={styles.modal_mobile_user}>@{posts.username}</h3>
          <div className={styles.modal_image}>
            <img src={posts.image} alt={posts.body} />
          </div>
          <div className={styles.modal_body}>
            <div>
              <h3 className={styles.modal_computer_user}>@{posts.username}</h3>
              <p>{posts.body}</p>
              <p>{posts.hashtags}</p>
            </div>
            <Comments id={id} />
            <form onSubmit={handleInsertComment}>
              {loading && <p>Loading</p>}
              <input
                className={styles.input}
                placeholder="Poste um comentário"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoPage;
