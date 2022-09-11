import React, { useEffect, useState } from "react";
import "./App.css";
import coicaplogo from "./coicaplogo.svg";
import SemiCoin from "./SemiCoin";

function App() {
  return (
    <div className="App">
      <div className="img-logo">
        <img className="logo" src={coicaplogo}></img>
      </div>

      <SemiCoin />
    </div>
  );
}

export default App;
