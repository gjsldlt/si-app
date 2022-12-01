import { FC, useState, MouseEvent } from "react";
import { Button, ButtonGroup, IconButton, Tooltip } from "@mui/material";

import { ButtonType } from "../types/ComponentTypes.type";
import Popover from '@mui/material/Popover';

import PopoverComponent from './PopoverComponent';

// HOW THIS COMPONENT WORK
//
// TEXT PROP:
// - mandatory prop
// - accepts array of string
// - becomes a button group when initialized with multiple strings  (e.g. text={['yes', 'no']})
// - renders button text left to right, based on index of the array
// - optionally used as tooltip text for IconButton
//
// TYPE PROP:
// - optional
// - used when button is inside a form tag and by setting as type 'submit'
//
// HANDLECLICK PROP:
// - optional
// - used to pass functions to the component
// - accepts array of functions (e.g. handleClick={[() => alert('yes'), () => alert('no')]})
// - needs to be same index as button to be pressed (e.g. if first index is 'one', then next is 'two', handleClick should be 'handleClick={[() => alert('one'), () => alert('two')]})
//
// STYLE PROP:
// - optional
// - used for changing buttons to MUI IconButton
// - only uses 'icon' value
// - icon prop is mandatory for this prop
// - can only accept MUI icons
//
// ICON PROP:
// - optional
// - used to pass imported MUI icons to use by MUI Button and IconButton components
// - use the imported MUI icon tag to pass the icon (e.g. icon={<DeleteIcon />})
//
// PLACEMENT PROP:
// - optional
// - accepts string values "bottom-end","bottom-start","bottom","left-end",
//   "left-start","left","right-end","right-start","right","top-end","top-start" or "top"
//   for placement of tooltip text for IconButton
//
// DISABLED PROP:
// - accepts conditions, variables or functions that returns either true or false (e.g. disabled={false}, disabled={index === 0 ? true : false} )
//
// VARIANT PROP:
// - optional
// - for MUI button style variants
// - accepts either text, outlined, or contained
//
// COLOR PROP:
// - optional
// - currently being used by IconButton for dynamically changing color of icons
// - accepts string values
// - used for changing text/icon color statically or dynamically (e.g. color='red', color={active ? 'blue' : 'red'})


const ButtonComponent: FC<ButtonType> = ({
  icon,
  type,
  variant,
  text,
  handleClick,
  disabled,
  style,
  color,
  placement,
  filter,
}) => {

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleFilter = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      {text.length > 1 ? (
        <ButtonGroup variant={variant} disabled={disabled}>
          {text.map((item, index) => (
            <Button
              key={index}
              onClick={handleClick ? handleClick[index] : undefined}
              type={type}
              sx={{ paddingX: `${text.length === 2 ? '4rem' : '2rem'}` }}
            >
              {item}
            </Button>
          ))}
        </ButtonGroup>
      ) : (
        <>
          {style === "icon" ? (
            <>
              <Tooltip title={text} placement={placement}>
                <IconButton
                  onClick={handleClick ? handleClick[0] : (filter ? handleFilter : undefined)}
                  size="small"
                  sx={{
                    width: "34px",
                    height: "34px",
                    color: color,
                  }}
                >
                  {icon}
                </IconButton>

              </Tooltip>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',

                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <PopoverComponent />
              </Popover>
            </>
          ) : (
            <Button
              variant={variant}
              type={type}
              onClick={handleClick ? handleClick[0] : undefined}
              disabled={disabled}
              startIcon={icon}
              sx={{ color: color }}
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
