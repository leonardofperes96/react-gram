import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import { links } from "../utils/helper/helper";
import { useUserContext } from "../contexts/UserContext";
import { BsCameraFill } from "react-icons/bs";

const Navigation = () => {
  const { data } = useUserContext();


  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <NavLink className={styles.header_logo} to="/">
         <BsCameraFill/>
        </NavLink>
        <nav className={styles.nav}>
          <ul className={styles.nav_list}>
            <li>
             {!data && <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.nav_link
                }
                to="/login"
              >
                Login
              </NavLink>}
              {data && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.nav_link
                  }
                  to="/user"
                >
                  User
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
