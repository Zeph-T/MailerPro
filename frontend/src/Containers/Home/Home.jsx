import React from "react";

import { useSelector } from "react-redux";

import styles from "./Home.module.css";

const Home = () => {
  const exampleState = useSelector((state) => state.example.exampleState);

  return (
    <div className={styles.container}>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
