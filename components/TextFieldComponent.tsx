import { MenuItem, TextField } from "@mui/material";
import React, { ChangeEvent, FC } from "react";

type TextFieldType = {
  id?: string;
  name?: string;
  label?: string;
  select?: boolean | undefined;
  children?: any;
  placeholder?: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  type?: "number" | "password" | "search" | "email" | undefined;
  value?: string | number | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  validation?: { error: boolean | undefined; errorMsg?: string };
  multiline?: { enabled: boolean | undefined; rows: number };
  className?: string;
};

const TextFieldComponent: FC<TextFieldType> = ({
  id,
  name,
  label,
  select,
  children,
  placeholder,
  variant,
  type,
  value,
  onChange,
  disabled,
  required,
  validation,
  multiline,
  className,
}) => {
  return (
    <>
      <TextField
        select={select}
        className={className}
        id={id}
        name={name}
        required={required}
        error={validation?.error}
        label={label}
        placeholder={placeholder}
        variant={variant}
        value={value}
        type={type}
        onChange={onChange}
        disabled={disabled}
        helperText={validation?.errorMsg ? validation?.errorMsg : ""}
        multiline={multiline?.enabled}
        rows={multiline?.rows}
      >
        {children}
      </TextField>
    </>
  );
};

export default TextFieldComponent;
