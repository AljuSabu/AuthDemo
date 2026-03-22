import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </>
  );
};

export default Home;
