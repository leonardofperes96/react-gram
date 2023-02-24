import React, { useState, useEffect } from "react";
import { useFetchDocument } from "../hooks/useFetchDocument";
import styles from "./EditPost.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateDocument } from "../hooks/useUpdateDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("photos", id);
  const [img, setImg] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [formError, setFormError] = useState("");
  const [body, setBody] = useState("");
  const { updatePhoto, loading, error } = useUpdateDocument("photos");
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setImg(post.image);
      setBody(post.body);
      setHashtags(post.hashtags);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      new URL(img);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    const data = {
      image: img,
      body,
      hashtags,
    };

    if (!img || !hashtags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    if (formError) return;

    updatePhoto(id, data);

    navigate("/");
  };

  return (
    <div className={styles.user_post_container}>
      <form onSubmit={handleSubmit} className={styles.user_post_form}>
        {post && (
          <>
            {" "}
            <label htmlFor="">Editando post: {post.body}</label>
            <input
              type="text"
              value={body || ""}
              placeholder="Pense em um bom titulo"
              onChange={(e) => setBody(e.target.value)}
            />
            <label htmlFor="">Editando Hashtags: {post.hashtags}</label>
            <input
              type="text"
              value={hashtags || ""}
              placeholder="Insira suas novas tags"
              onChange={(e) => setHashtags(e.target.value)}
            />
            <label htmlFor="">Url da imagem</label>
            <input
              type="text"
              value={img || ""}
              placeholder="Insira sua nova imagem"
              onChange={(e) => setImg(e.target.value)}
            />
            {loading ? (
              <button>Carregando....</button>
            ) : (
              <button>Enviar</button>
            )}
            {error && <p className='error'>{error}</p>}
            {formError && <p>{formError}</p>}
          </>
        )}
      </form>
    </div>
  );
};

export default EditPost;
