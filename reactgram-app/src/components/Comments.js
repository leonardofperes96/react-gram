import React, { useEffect, useRef } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import { Link } from "react-router-dom";
import styles from "./Comments.module.css";

import CommentsItem from "./CommentsItem";

const Comments = ({ id }) => {
  const commentsSection = useRef(null);
  const { data, loading, error } = useFetchDocuments("comments");
  const { data: userData } = useUserContext();
  const filterComments =
    data && data.filter((comment) => comment.commentId === id);
  const noCommentsWithUser =
    userData && filterComments && filterComments.length < 1 ? (
      <h2 style={{ textAlign: "center", margin: "30% auto" }}>
        Ainda não há comentarios, comente agora!
      </h2>
    ) : (
      ""
    );

  const noCommentsWithoutUser =
    !userData && filterComments && filterComments.length < 1 ? (
      <>
        <h3 style={{ textAlign: "center", margin: "30% auto" }}>
          Ainda não há comentarios, comente agora!
        </h3>
        <p style={{ textAlign: "center" }}>
          Para comentar precisa estar logado,{" "}
          <Link to="/login" style={{ color: "#fb1" }}>
            Logue agora
          </Link>
        </p>
      </>
    ) : (
      ""
    );

  useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [filterComments]);

  return (
    <div ref={commentsSection} className={styles.comments}>
      {noCommentsWithUser}
      {noCommentsWithoutUser}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {filterComments &&
        filterComments.map((item) => (
          <CommentsItem
            key={item.id}
            commentId={item.id}
            userComment={item.userComment}
            comment={item.comment}
            userCommentId={item.userCommentId}
          />
        ))}
    </div>
  );
};

export default Comments;
