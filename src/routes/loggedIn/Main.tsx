import React, { Suspense } from "react";
import NavBar from "../../components/ui/navigation/NavBar";
import Hidden from "@mui/material/Hidden";
import SideBar from "../../components/ui/navigation/SideBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import InstanceModal from "@/components/containers/instanceModal/InstanceModal";
import { useTheme } from "@mui/material";
import { sidebarWidth } from "@/core/constants/severityTypes";
import Drawer from "@mui/material/Drawer";
import LoadingLazy from "@/pages/LoadingLazy";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    //necesario para que el contenido esté debajo de la barra de la aplicación
    ...theme.mixins.toolbar
}));

const Main: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const secondaryColor = theme.palette.mode === 'light' ? '#EEF2F6' : '#2d2e2f';
    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar open={open} setOpen={setOpen} />
            <Hidden smUp>
                {/* modificar en el futuro */}
                <Drawer
                    variant="temporary"
                    open={open}
                    onClose={() => setOpen(false)}
                > 
                    <SideBar open={open} setOpen={setOpen}/>
                </Drawer>
            </Hidden>
            <Hidden smDown>
                <SideBar open={open} setOpen={setOpen} />
            </Hidden>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 2,
                    backgroundColor: secondaryColor,
                    gap: 2,
                    width: { xs: '100%', sm: `calc(100% - ${sidebarWidth}px)` },
                    minHeight: '100vh',
                }}
            >
                <DrawerHeader />
                <Suspense fallback={<LoadingLazy/>}>
                    <Outlet />
                </Suspense>
                <InstanceModal />
            </Box>
        </Box>
    );
}

export default Main;
