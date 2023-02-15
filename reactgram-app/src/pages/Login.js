import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { BsGoogle } from "react-icons/bs";
import { useUserContext } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error: loginError, loading } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    await login(data);
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_container}>
        <div className={styles.login_img}></div>
        <div className={styles.login_form}>
          <h2>ReactGram</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loading ? (
              <button disabled className={styles.form_btn}>
                Loading...
              </button>
            ) : (
              <button className={styles.form_btn}>Entrar</button>
            )}
            {loginError && <p className={styles.error}>{loginError}</p>}
          </form>
          <>
            <p className={styles.google_text}>ou</p>
            <button className={styles.google_btn}>
              <BsGoogle /> Google
            </button>
          </>
          <div className={styles.login_options}>
            <p>
              Não tem uma conta?{" "}
              <Link className={styles.register_link} to="/register">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
