import React, { useState, useEffect } from "react";
import { useFetchPhoto } from "../hooks/useFetchPhoto";
import styles from "./EditPost.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdatePhoto } from "../hooks/useUpdatePhoto";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchPhoto("photos", id);
  const [img, setImg] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [formError, setFormError] = useState('')
  const [body, setBody] = useState("");
  const { updatePhoto } = useUpdatePhoto("photos");
  const navigate = useNavigate();

  console.log(post);

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

    navigate('/')
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
            <label htmlFor="">Url da imagem: {post.image}</label>
            <input
              type="text"
              value={img || ""}
              placeholder="Insira sua nova imagem"
              onChange={(e) => setImg(e.target.value)}
            />
            <button>Editar</button>
          </>
        )}
      </form>
    </div>
  );
};

export default EditPost;
