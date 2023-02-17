import React from "react";
import UserHeader from "../components/UserHeader";
import { Routes, Route } from "react-router-dom";
import UserPost from "./UserPost";
import styles from "./UserPage.module.css";
import UserFeed from "../components/UserFeed";

const UserPage = () => {
  return (
    <div className={styles.user_container}>
      <UserHeader />
      <Routes>
        <Route path="post" element={<UserPost />} />
        <Route path="/" element={<UserFeed />} />
      </Routes>
    </div>
  );
};

export default UserPage;
