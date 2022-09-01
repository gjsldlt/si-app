import { FC } from "react";
import { Button, ButtonGroup } from "@mui/material";

type ButtonType = {
  type?: "button" | "submit" | "reset" | undefined;
  handleClick?: any;
  variant?: "text" | "outlined" | "contained" | undefined;
  text: string[];
  secondText?: string;
  disabled?:boolean;
};

const ButtonComponent: FC<ButtonType> = ({
  type,
  variant,
  text,
  handleClick,
  disabled
}) => {
  return (
    <>
      {text.length > 1 ? (
        <ButtonGroup variant={variant} disabled={disabled}>
          {text?.map((item, index) => (
            <Button
              key={index}
              onClick={handleClick ? handleClick[index] : undefined}
              type={type}
              sx={{ paddingX: `${text.length === 2 ? "4rem" : "2rem"}` }}
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
