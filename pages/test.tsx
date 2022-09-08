import { MenuItem, TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import TextFieldComponent from "../components/TextFieldComponent";

const Test = () => {
  const [test, setTest] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [selectTest, setSelect] = useState<string>("");
  const [formItems, setFormItems] = useState<{ name: string; email?: string }>({
    name: "",
    email: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let input = e.target.value;
    setName(input);
  };

  const items: string[] = ["one", "two", "three", "four", "five"];

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelect(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("test");
    setFormItems({ name: name });
  };
  return (
    <div>
      <TextFieldComponent
        select={true}
        label="TEST"
        value={selectTest}
        onChange={handleSelect}
        className="w-48"
      >
        {items.map((item, i) => (
          <MenuItem key={i} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextFieldComponent>
    </div>
  );
};

export default Test;
