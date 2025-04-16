import "./App.css";
import { useState } from "react";
import { CssBaseline } from "@mui/material";
import createCustomTheme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { RouterProvider } from "react-router-dom";
import { Routing } from "./routes/Routing";
import { Provider } from "react-redux";
import store from "./stateManagement/store";
import { IntlProvider } from "react-intl";
import { languageWithoutRegionCode, messages } from "./utils/localizer";
import NotistackProvider from "./components/containers/notiStack/NotistackProvider";
// import { Suspense } from 'react';
// import LoadingLazy from '@/pages/LoadingLazy';

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  const theme = createCustomTheme(mode);
  return (
    <Provider store={store}>
      <IntlProvider
        locale={languageWithoutRegionCode}
        defaultLocale="es"
        messages={messages}
      >
        <ThemeProvider theme={theme}>
          <NotistackProvider>         
            <CssBaseline />
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                zIndex: 1299,
                backgroundColor: theme.palette.background.default,
                borderRadius: "0 0 0 10px",
                padding: "3px",
              }}
            >
              <IconButton onClick={toggleColorMode} color="inherit">
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </div>           
            <RouterProvider router={Routing} />
          </NotistackProvider>
        </ThemeProvider>
      </IntlProvider>
    </Provider>
  );
}

export default App;
