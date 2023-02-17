import React, { useEffect, useState } from "react";
import styles from "./UserHeader.module.css";
import { BiGridAlt, BiLogOut, BiPlus, BiMenu } from "react-icons/bi";
import { NavLink, useLocation } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const UserHeader = () => {
  const [dropdown, setDropdown] = useState(false);
  const { data, logout } = useUserContext();
  const [title, setTitle] = useState("");
  const location = useLocation();

  const activeDropdown = (e) => {
    setDropdown(!dropdown);
  };

  const activeLogout = () => {
    setDropdown(!dropdown);
    logout();
  };

  useEffect(() => {
    const { pathname } = location;

    switch (pathname) {
      case "/user":
        setTitle("Bem Vindo");
        break;
      case "/user/post":
        setTitle("Poste agora");
        break;
      default:
        setTitle("Bem Vindo");
    }
  }, [location]);

  return (
    <div className={styles.user_header}>
      <h2 className={styles.user_header_title}>
        {title}, @{data.displayName}
      </h2>
      <div className={styles.dropdown}>
        <button onClick={activeDropdown} className={styles.dropbtn}>
          <BiMenu />
        </button>
        <div className={`${dropdown ? styles.show : styles.dropdown_content}`}>
          <NavLink onClick={activeDropdown} className={styles.links} to="/user">
            user
          </NavLink>
          <NavLink
            onClick={activeDropdown}
            className={styles.links}
            to="/user/post"
          >
            post
          </NavLink>
          <button onClick={activeLogout} className={styles.links}>
            Logout
          </button>
        </div>
      </div>
      <div className={styles.icons_container}>
        <NavLink className={styles.links_icon} to="/user">
          <BiGridAlt className={styles.icons} />
        </NavLink>
        <NavLink className={styles.links_icon} to="/user/post">
          <BiPlus className={styles.icons} />
        </NavLink>
        <BiLogOut onClick={logout} className={styles.icons} />
      </div>
    </div>
  );
};

export default UserHeader;
