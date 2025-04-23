import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";
import MiIcono from "@/assets/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import UpdateProviderIcon from "@mui/icons-material/ManageAccounts";
import QuotesIcon from "@mui/icons-material/AttachMoney";
import ServiceIcon from "@mui/icons-material/Build";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import { paths } from "@/core/constants";
import { Link, useLocation } from "react-router-dom";
import Auth from "@/core/services/auth/auth";
import { CircularProgress, Tooltip } from "@mui/material";
import { sidebarWidth } from "@/core/constants/severityTypes";
import LogoutIcon from "@mui/icons-material/Logout";
import { Fragment, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMenu from "@/core/hooks/useMenu";

const drawerWidth = sidebarWidth;

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
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: theme.palette.primary.main,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));



const pagesList = [
  {
    link: paths.DASHBOARD,
    name: "Dashboard",
    icon: <HomeIcon />,
  },
	{
		link: paths.UPDATE_PROVIDER,
		name: "Actualizar datos",
		icon: <UpdateProviderIcon />,
	},
	{
		link: paths.SERVICES,
		name: "Mis Servicios",
		icon: <ServiceIcon />,
	},
	{
		link: paths.QUOTES,
		name: "Cotizaciones",
		icon: <QuotesIcon />,
	},
	{
		link: paths.PROFILE,
		name: "Perfil",
		icon: <ProfileIcon />,
	}
];


interface SideBarProps {
  open: boolean;
  setOpen: Function;
}
function SideBar({ open, setOpen }: SideBarProps) {
  const theme = useTheme();
  const location = useLocation();
  const { items, isLoading } = useMenu();
  const currentPath = location.pathname;
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openSubMenu, setOpenSubMenu] = useState(null);

  const colorCustom = theme.palette.mode === "light" ? "#EEF2F6" : "#2d2e2f";

  const handleClick = (index: any) => {
    if (openSubMenu === index) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(index);
    }
  };
  function getScreenWidth(): number {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }

    return 0;
  }
  let screenSize = getScreenWidth();

  //en pantalla movil empieza desde la parte superior
  useEffect(() => {
    if (window.innerWidth <= 767) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
						fontWeight: 'bold',
						fontSize: '20px'
          }}
        >
          <img
            src={MiIcono}
            style={{ width: "25px", height: "auto", marginRight: "20px" }}
            alt="Icono"
          />
          Fiest<span style={{ color: '#e7000b' }}>App</span>
        </Box>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            width: "0.3em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgb(191,192,194)",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: theme.palette.secondary.light,
            },
          },
        }}
      >
        <List>
          {pagesList.map((page) => (
            <ListItem key={page.name} disablePadding sx={{ display: "block" }}>
              <Link
                to={page.link}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => {
                  if (screenSize <= 767) {
                    handleDrawerClose();
                  } else {
                  }
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 40,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor:
                      currentPath === page.link ? colorCustom : "inherit",
                    color: "inherit",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Tooltip
                      title={page.name}
                      arrow
                      TransitionComponent={Zoom}
                      placement="right"
                    >
                      {page.icon}
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText
                    primary={page.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <>
          {isLoading ? (
            <CircularProgress/>
          ) : (
            <List>
              {items.map((page, index) => (
                <Fragment key={page.name}>
                  <ListItem disablePadding sx={{ display: "block" }}>
                    {page.children ? (
                      <>
                        <ListItemButton
                          onClick={() => {
                            if (screenSize <= 767 && page?.url) {
                              handleDrawerClose();
                            } else {
                              handleClick(index);
                            }
                          }}
                          sx={{
                            minHeight: 40,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                            backgroundColor:
                              currentPath === page.url
                                ? colorCustom
                                : "inherit",
                            color: "inherit",
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            <Tooltip
                              title={page.name}
                              arrow
                              TransitionComponent={Zoom}
                              placement="right"
                            >
                              {page.iconWeb}
                            </Tooltip>
                          </ListItemIcon>
                          {open && (
                            <ListItemText
                              primary={page.name}
                              sx={{ opacity: open ? 1 : 0 }}
                            />
                          )}
                          {openSubMenu === index && open ? (
                            <ExpandMoreIcon />
                          ) : (
                            openSubMenu != index && open && <ChevronRightIcon />
                          )}
                        </ListItemButton>
                        {openSubMenu === index && (
                          <List component="div" disablePadding>
                            {page.children.map((child:any) => (
                              <ListItem
                                key={child.name}
                                disablePadding
                                sx={{ display: "block", pl: open ? 4 : 0 }}
                                component="div"
                              >
                                <Link
                                  to={child.url}
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                  onClick={() => {
                                    if (screenSize <= 767) {
                                      handleDrawerClose();
                                    } else {
                                    }
                                  }}
                                >
                                  <ListItemButton
                                    sx={{
                                      minHeight: 40,
                                      justifyContent: open
                                        ? "initial"
                                        : "center",
                                      px: 2.5,
                                      backgroundColor:
                                        currentPath === child.url
                                          ? colorCustom
                                          : "inherit",
                                      color: "inherit",
                                    }}
                                  >
                                    <ListItemIcon
                                      sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <Tooltip
                                        title={child.name}
                                        arrow
                                        TransitionComponent={Zoom}
                                        placement="right"
                                      >
                                        {child.iconWeb}
                                      </Tooltip>
                                    </ListItemIcon>
                                    {open && (
                                      <ListItemText
                                        primary={child.name}
                                        sx={{ opacity: open ? 1 : 0 }}
                                      />
                                    )}
                                  </ListItemButton>
                                </Link>
                              </ListItem>
                            ))}
                          </List>
                        )}
                      </>
                    ) : (
                      <Link
                        to={page.url}
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={() => {
                          if (screenSize <= 767) {
                            handleDrawerClose();
                          } else {
                          }
                        }}
                      >
                        <ListItemButton
                          sx={{
                            minHeight: 40,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                            backgroundColor:
                              currentPath === page.url
                                ? colorCustom
                                : "inherit",
                            color: "inherit",
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            <Tooltip
                              title={page.name}
                              arrow
                              TransitionComponent={Zoom}
                              placement="right"
                            >
                              {page.iconWeb}
                            </Tooltip>
                          </ListItemIcon>
                          {open && (
                            <ListItemText
                              primary={page.name}
                              sx={{ opacity: open ? 1 : 0 }}
                            />
                          )}
                        </ListItemButton>
                      </Link>
                    )}
                  </ListItem>
                </Fragment>
              ))}
            </List>
          )}
        </>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <Link
              to={paths.LOGIN}
              style={{ textDecoration: "none", color: "inherit" }}
              // onClick={handleDrawerClose}
            >
              <ListItemButton
                sx={{
                  minHeight: 40,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  Auth.logout();
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip
                    title={"Salir"}
                    arrow
                    TransitionComponent={Zoom}
                    placement="right"
                  >
                    <LogoutIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText
                  primary={"Salir"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}
export default SideBar;
