import React from 'react'
import styles from './UserPost.module.css'

const UserPost = () => {
  return (
    <div className={styles.user_post_container}>
    <form className={styles.user_post_form}>
      <label htmlFor="">Legenda</label>
      <input type="text" />
      <label htmlFor="">Hashtags</label>
      <input type="text" />
      <label htmlFor="">Url da Imagem</label>
      <input type="text" />
      <button>Enviar</button>
    </form>
    </div>
  )
}

export default UserPost
