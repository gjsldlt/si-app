import React from "react";
import { FC } from "react";
import { Button, ButtonGroup } from "@mui/material";

type ButtonType = {
  type?: "button" | "submit" | "reset" | undefined;
  handleClick?: any;
  variant?: "text" | "outlined" | "contained" | undefined;
  text: string[];
  secondText?: string;
};

const ButtonComponent: FC<ButtonType> = ({
  type,
  variant,
  text,
  handleClick,
}) => {
  return (
    <>
      {text.length > 1 ? (
        <ButtonGroup variant={variant}>
          {text?.map((item, index) => (
            <Button
              onClick={handleClick ? handleClick[index] : undefined}
              type={type}
            >
              {item}
            </Button>
          ))}
        </ButtonGroup>
      ) : (
        <Button
          variant={variant}
          type={type}
          onClick={handleClick ? handleClick[0] : undefined}
        >
          {text[0]}
        </Button>
      )}
    </>
  );
};

export default ButtonComponent;
