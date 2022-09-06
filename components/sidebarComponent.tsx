import * as React from "react";
import { useRouter } from "next/router";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { DatabaseIcon, HomeIcon, UserGroupIcon } from "@heroicons/react/solid";
import { Avatar, Button, Card, CardHeader } from "@mui/material";
import { clearUserSession } from "../services/user.service";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const menuList = [
  { name: "Home", icon: <HomeIcon />, link: "/" },
  { name: "Employees", icon: <UserGroupIcon />, link: "/users" },
  { name: "Metadata", icon: <DatabaseIcon />, link: "/metadatas" },
];

export default function MiniDrawer() {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    link: string
  ) => {
    setSelectedIndex(index);
    router.push(link);
    setOpen(false);
  };

  const handleLogout = () => {
    clearUserSession();
    router.push("/login");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            iFED
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader className="h-[120px] relative justify-center">
          <img
            src="/assets/images/deloitte-logo.png"
            alt="DCPDC Logo"
            className={`${!open && "hidden"} w-44`}
          />
          <IconButton
            onClick={handleDrawerClose}
            className={`${
              !open && "hidden"
            } text-gray hover:text-white absolute top-2 right-0`}
          >
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuList.map((item, i) => (
            <ListItem
              key={i}
              disablePadding
              sx={{ display: "block" }}
              className="hover:bg-[#323335]  "
            >
              <ListItemButton
                selected={router.pathname === item.link}
                onClick={(event) => handleListItemClick(event, i, item.link)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                className={`${
                  router.pathname === item.link && "!bg-main text-black"
                } group`}
              >
                <ListItemIcon
                  className={`${
                    router.pathname === item.link && "text-black"
                  } text-gray group-hover:text-white w-7`}
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  className={`${
                    router.pathname === item.link && "text-black"
                  } text-gray group-hover:text-white `}
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {open && (
          <div className="text-white flex flex-col mt-auto mb-4 lg:mb-12">
            <p className="text-[#4F4F51] uppercase text-xs ml-4">Profile</p>
            <Card sx={{ maxWidth: 345 }} className="bg-transparent shadow-none">
              <CardHeader
                avatar={
                  <Avatar className="-mr-2" aria-label="recipe">
                    R
                  </Avatar>
                }
                title="Juan Dela Cruz"
                subheader="Front-end Developer"
              />
            </Card>
            <div className="self-center mt-0 lg:mt-4">
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        )}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <DrawerHeader /> */}
      </Box>
    </Box>
  );
}
