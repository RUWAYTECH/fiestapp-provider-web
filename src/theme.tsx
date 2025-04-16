import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

const createCustomTheme = (mode: 'light' | 'dark') => {
    return createTheme({
        palette: {
            mode,
            primary: {
                light: '#538CFF',
                main: '#2970FF',
                dark: '#1C4EB2',
                contrastText: '#fff',
            },
            secondary: {
                light: '#49505E',
                main: '#1C2536',
                dark: '#131925',
                contrastText: '#fff',
            },
            
            common: {
                black: '#000',
                white: '#fff',
            },
            error: {
                main: red.A400,
                light: red[300],
                dark: red[700],
                contrastText: '#fff',
            },
        },
        breakpoints: {
            values: {
                xl,
                lg,
                md,
                sm,
                xs,
            },
        },
        components: {
            MuiTextField: {
                defaultProps: {
                  size: "small"
                }
              }
        }
        
    });
}

export default createCustomTheme;