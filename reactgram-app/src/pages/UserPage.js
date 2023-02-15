import React from "react";
import UserHeader from "../components/UserHeader";
import { Routes, Route } from "react-router-dom";
import UserPost from "./UserPost";
import styles from "./UserPage.module.css";

const UserPage = () => {
  return (
    <div className={styles.user_container}>
      <UserHeader />
      {/* user posts */}
      <Routes>
        <Route path="post" element={<UserPost />} />
      </Routes>
    </div>
  );
};

export default UserPage;
