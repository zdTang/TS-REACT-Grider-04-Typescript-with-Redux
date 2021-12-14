import React, { useState } from "react";

const Input = () => {
  const [term, setTerm] = useState("");
  const clickHandler = () => {
    console.log(term);
  };
  return (
    <div>
      <h1>this is child</h1>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      ></input>
      <div>
        <button onClick={clickHandler}>Submit</button>
      </div>
    </div>
  );
};

export default Input;
