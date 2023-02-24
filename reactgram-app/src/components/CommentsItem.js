import React from "react";
import styles from "./CommentsItem.module.css";
import { BiTrash } from "react-icons/bi";

import { useUserContext } from "../contexts/UserContext";
import { useDeleteDocument } from "../hooks/useDeleteDocument";

const CommentsItem = ({ commentId, userComment, comment, userCommentId }) => {
  const { deleteDocument } = useDeleteDocument("comments");
  const { data: userData } = useUserContext();
  const userId = userData && userData.uid;

  return (
    <>
      <p className={styles.comment_paragraph}>
        <strong>{userComment}</strong>: {comment}
        {userData && userCommentId === userId && (
          <BiTrash onClick={() => deleteDocument(commentId)} />
        )}
      </p>
    </>
  );
};

export default CommentsItem;
