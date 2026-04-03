import React from "react";
import Home from "../src/pages/Home"; // Make sure this path matches where you saved Home.jsx

function App() {
  return (
    // The fragment <> </> is a clean way to wrap components in React
    <>
      <Home />
    </>
  );
}

export default App;
