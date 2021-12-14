import React, { useState } from "react";

const Input = () => {
  const [term, setTerm] = useState("");
  const [Repository, setRepository] = useState<any>(null);
  const [Error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const clickHandler = async () => {
    setIsLoading(true);
    // Get data from Api
    try {
      const result = await fetch(
        `https://registry.npmjs.org/-/v1/search?text=${term}`
      );
      if (!result.ok) {
        setError("Data wrong!");
      } else {
        // update our state
        const resultJson = await result.json();
        setRepository(resultJson.objects);
        setIsLoading(false);
      }
    } catch (err) {
      setError("Request wrong!");
      setIsLoading(false);
    }
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
      {isLoading && "is Loading..."}
      {Error.trim().length > 0 && Error}
      {Repository &&
        Repository.map((item: any) => (
          <div key={item.package.name}>{item.package.name}</div>
        ))}
    </div>
  );
};

export default Input;
