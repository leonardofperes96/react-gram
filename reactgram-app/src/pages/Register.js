import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { BsGoogle } from "react-icons/bs";
import { useUserContext } from "../contexts/UserContext";

const Login = () => {
  const { register, data, error: registerError, loading } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      displayName: username,
      email,
      password,
    };

    await register(data);

    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setUsername("");
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_container}>
        <div className={styles.login_img}></div>
        <div className={styles.login_form}>
          <h2>ReactGram</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="username"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {loading ? (
              <button disabled className={styles.form_btn}>
                Loading...
              </button>
            ) : (
              <button className={styles.form_btn}>Entrar</button>
            )}
            {registerError && <p className={styles.error}>{registerError}</p>}
          </form>
          <>
            <p className={styles.google_text}>ou entre com</p>
            <button className={styles.google_btn}>
              <BsGoogle /> Google
            </button>
          </>
          <div className={styles.login_options}>
            <p>
              Já tem uma conta?{" "}
              <Link className={styles.register_link} to="/login">
                Entre agora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
