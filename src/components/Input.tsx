import React, { useState } from "react";

const Input = () => {
  const [term, setTerm] = useState("");
  const [Repository, setRepository] = useState<any>(null);
  const [isError, setIsError] = useState(false);
  const [Error, setError] = useState("");
  const clickHandler = async () => {
    // Get data from Api
    const result = await fetch(
      `https://registry.npmjs.org/-/v1/search?text=${term}`
    );
    if (!result.ok) {
      setIsError(true);
      setError("Request wrong!");
    }
    // update our state
    const resultJson = await result.json();
    setRepository(resultJson.objects);
    console.log(resultJson.objects);
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
      {isError && Error}
      {Repository &&
        Repository.map((item: any) => (
          <div key={item.package.name}>{item.package.name}</div>
        ))}
    </div>
  );
};

export default Input;
