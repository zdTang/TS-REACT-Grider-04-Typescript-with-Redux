import React, { useState } from "react";

// create type for API data
interface Repo {
  name: string;
}
interface item {
  package: Repo;
}

const Input = () => {
  const [term, setTerm] = useState("");
  const [Repository, setRepository] = useState<item[]>([]);
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
        console.log(resultJson.objects);
        setIsLoading(false);
      }
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const enteredItemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };
  return (
    <div>
      <h1>this is child</h1>
      <input type="text" value={term} onChange={enteredItemHandler}></input>
      <div>
        <button onClick={clickHandler}>Submit</button>
      </div>
      {isLoading && "is Loading..."}
      {Error.trim().length > 0 && Error}
      {Repository &&
        Repository.map((item: item) => (
          <div key={item.package.name}>{item.package.name}</div>
        ))}
    </div>
  );
};

export default Input;
