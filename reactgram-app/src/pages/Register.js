import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { BsGoogle } from "react-icons/bs";

const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles.login_container}>
        <div className={styles.login_img}></div>
        <div className={styles.login_form}>
          <h2>ReactGram</h2>
          <form className={styles.form}>
            <input type="text" placeholder="Nome de usuário" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Senha" />
            <input type="text" placeholder="Confirme a senha" />
            
            <button className={styles.form_btn}>Entrar</button>
          </form>
          <>
            <p className={styles.google_text}>ou entre com</p>
            <button className={styles.google_btn}>
              <BsGoogle /> Google
            </button>
          </>
          <div className={styles.login_options}>
            <p>
              Já tem uma conta? <Link className={styles.register_link} to="/login">Entre agora</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
