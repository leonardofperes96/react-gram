import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import { links } from "../utils/helper/helper";

const Navigation = () => {

  

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <NavLink className={styles.header_logo} to="/">
          React<span>Gram</span>
        </NavLink>
        <nav className={styles.nav}>
          <ul className={styles.nav_list}>
            {links.map(({ url, name, id }) => (
              <li key={id}>
                <NavLink  className={({ isActive }) => (isActive ? styles.active : styles.nav_link)} to={url}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
