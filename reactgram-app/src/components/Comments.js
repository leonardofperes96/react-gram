import React from "react";
import { useFetchPhotos } from "../hooks/useFetchPhotos";
import styles from "./Comments.module.css";

const Comments = ({ id }) => {
  const { data, loading, error } = useFetchPhotos("comments");

  const filterComments =
    data && data.filter((comment) => comment.commentId === id);

  return (
    <div className={styles.comments}>
      {filterComments &&
        filterComments.map((item) => (
          <p className={styles.comments_container} key={item.id}>
            <strong>{item.userComment}</strong>: {item.comment}
          </p>
        ))}
    </div>
  );
};

export default Comments;
