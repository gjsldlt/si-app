import { MenuItem, TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import SidebarTest from "../components/SidebarTest";
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
      {/* <SidebarTest /> */}
    </div>
  );
};

export default Test;
