import { FC } from "react";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import { ImportContacts } from "@mui/icons-material";

type ButtonType = {
  type?: "button" | "submit" | "reset" | undefined;
  handleClick?: any;
  variant?: "text" | "outlined" | "contained" | undefined;
  text: string[];
  secondText?: string;
  disabled?: boolean;
  icon?: any;
  style?: string;
  color?: string;
};

const ButtonComponent: FC<ButtonType> = ({
  icon,
  type,
  variant,
  text,
  handleClick,
  disabled,
  style,
  color,
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
        <>
          {style === "icon" ? (
            <IconButton
              onClick={handleClick ? handleClick[0] : undefined}
              size="small"
              sx={{ color: color }}
            >
              {icon}
            </IconButton>
          ) : (
            <Button
              variant={variant}
              type={type}
              onClick={handleClick ? handleClick[0] : undefined}
              disabled={disabled}
              startIcon={icon}
            >
              {text[0]}
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default ButtonComponent;
