import { MenuItem, TextField } from "@mui/material";
import React, { ChangeEvent, FC } from "react";

type TextFieldType = {
  id?: string;
  name?: string;
  label: string;
  select?: boolean | undefined;
  children?: any;
  placeholder?: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  type?: "number" | "password" | "search" | "email" | undefined;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  validation?: { error: boolean | undefined; errorMsg?: string };
  multiline?: { enabled: boolean | undefined; rows: number };
  className?: string;
  ariaLabel?: string;
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
  ariaLabel,
}) => {
  // HOW THIS COMPONENT WORK
  //
  // ID PROP:
  // - optional
  // - accepts string values; sets id to the component
  //
  // NAME PROP:
  // - optional
  // - accepts string values; sets name to the component
  //
  // LABEL PROP:
  // - mandatory
  // - accepts string values; sets the label for the input field
  //
  // SELECT PROP:
  // - optional
  // - accepts boolean values; changes input field to a dropdown select element
  // - needs to pass children of mapped array of values inside <MenuItem> tags to be selected
  //
  // EXAMPLE:
  // <TextFieldComponent
  //  label='Select'
  //  select={true}
  //  value={defaultValue}
  //  onChange={changeValue}>
  // {x.map((item, index) => (
  //    <MenuItem key={index} value={item}>
  //      {item}
  //    </MenuItem>
  //  ))}
  // </TextFieldComponent/>
  //
  // CHILDREN PROP:
  // - optional
  // - currently only needed for getting dropdown options for select prop
  //
  // PLACEHOLDER PROP:
  // - optional
  // - accepts string values to be rendered as placeholder for the textfield
  //
  // VARIANT PROP:
  // - optional
  // - changes the style of the TextFieldComponent to standard, filled or outlined
  //
  // TYPE PROP:
  // - optional
  // - changes the type of input the TextFieldComponent accepts to either text, number, password or email and also changes the style
  //    of the TextFieldComponent to that of a search bar with an X icon at the end when set to 'search' type
  //
  // VALUE PROP:
  // - mandatory
  // - sets the default value of the TextFieldComponent to that of a state that which the component is binded to
  // - needed for changing, accepting values by onChange event
  //
  // ONCHANGE PROP:
  // - mandatory
  // - function to change value based on the function the onChange prop is binded to
  // - requires value prop to be changed
  //
  // DISABLED PROP:
  // - optional
  // - accepts values, functions or conditions that return boolean results
  //
  // REQUIRED PROP:
  // - optional
  // - accepts boolean values that sets the TextFieldComponent to require values to be inputted before submitting in a form
  //
  // VALIDATION PROP(WIP):
  // - optional
  // - accepts an object that has an error and errorMsg keys (e.g. validation={{error:true, errorMsg:'invalid input'}})
  // - error key accepts boolean to make the TextFieldComponent show an error message and makes the border red
  // - errorMsg accepts string that displays a prompt for an error message
  //
  // MULTILINE PROP:
  // - optional
  // - accepts object that has enabled and rows as keys (e.g. multiline={{enabled:true, rows: 4}})
  // - enabled key accepts boolean values and turns the TextFieldComponent from an input element to a textarea element
  // - rows key accepts numeric values and adds rows to the TextFieldComponent
  //
  // CLASSNAME PROP:
  // - optinal
  // - accepts string to set className for TextFieldComponent
  // - currently being used for adding tailwind classes
  //
  // ARIALABEL PROP:
  // - optional
  // - accepts string to set aria-label

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
        inputProps={{ "aria-label": ariaLabel }}
      >
        {children}
      </TextField>
    </>
  );
};

export default TextFieldComponent;
