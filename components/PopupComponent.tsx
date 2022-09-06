import { FC } from "react";
import { Box, Modal, Typography } from "@mui/material";
type PopupType = {
  open: boolean;
  close?: any;
  title: string | any;
  entry?: string;
  children?: any;
};

const PopupComponent: FC<PopupType> = ({
  open,
  close,
  title,
  children,
  entry,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: "5px",
  };

  return (
    <>
      <Modal open={open}>
        <Box sx={style}>
          <div className="text-lg font-bold text-center">{title}</div>
          <div className='text-center text-lg'>{entry}</div>
          {children}
        </Box>
      </Modal>
    </>
  );
};

export default PopupComponent;
