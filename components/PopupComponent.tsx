import { FC } from "react";
import { Box, Modal, Typography } from "@mui/material";
type PopupType = {
  open: boolean;
  close?: any;
  title: string | any;
  children?: any;
};

const PopupComponent: FC<PopupType> = ({ open, close, title, children }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
  };

  return (
    <>
      <Modal open={open}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            <div className="text-center">{title}</div>
          </Typography>
          {children}
        </Box>
      </Modal>
    </>
  );
};

export default PopupComponent;
