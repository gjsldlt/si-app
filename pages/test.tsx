import { TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import TextFieldComponent from "../components/TextFieldComponent";

const Test = () => {
  const [test, setTest] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [formItems, setFormItems] = useState<{ name: string; email?: string }>({
    name: "",
    email: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let input = e.target.value;
    setName(input);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("test");
    setFormItems({ name: name });
  };
  return (
    <div>
      <h1>Name: {formItems.name}</h1>
      <form onSubmit={handleSubmit}>
        <TextFieldComponent
          required={true}
          validation={{ error: name === "", errorMsg: "cannot leave blank" }}
          label="TEST"
          placeholder="TEST"
          type="email"
          value={name}
          onChange={handleChange}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Test;
