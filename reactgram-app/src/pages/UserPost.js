import React, { useState } from "react";
import styles from "./UserPost.module.css";

import { useUserContext } from "../contexts/UserContext";
import { useInsertDocument } from "../hooks/useInsertDocument";
import { useNavigate } from "react-router-dom";

const UserPost = () => {
  const [img, setImg] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [body, setBody] = useState("");
  const [formError, setFormError] = useState("");
  const { loading, error, insertDocument } = useInsertDocument("photos");
  const { data } = useUserContext();
  const navigate = useNavigate();

  const userId = data && data.uid;
  const username = data && data.displayName;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      new URL(img);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    const data = {
      image: img,
      hashtags,
      body,
      userId,
      username,
    };

    if (!img || !hashtags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    if (formError) return;

    insertDocument(data);

    setImg("");
    setHashtags("");
    setBody("");

    navigate("/");
  };

  return (
    <div className={styles.user_post_container}>
      <form onSubmit={handleSubmit} className={styles.user_post_form}>
        <label htmlFor="">Legenda</label>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <label htmlFor="">Hashtags</label>
        <input
          type="text"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
        />
        <label htmlFor="">Url da Imagem</label>
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        {loading && <button disabled>Loading...</button>}
        {!loading && <button>Postar</button>}
        {error && <p className="error">{error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default UserPost;
