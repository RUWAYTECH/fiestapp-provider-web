import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
    box: {
        margin: '25px',
    },
    image: {
        width: '100%',
        height: '100vh',
        objectFit: 'cover',
        objectPosition: 'center'
    },
    logo: {
        width: '15%',
        marginTop: '1%',
        marginBottom: '1%'
    },
    card: {
        width: '50%',
        maxWidth: '500px',
        minWidth: '330px',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        boxShadow: 'none',
        borderRadius: '8px',
        border: '1px solid rgba(0, 0, 0, 0.12)',
    },
    typographyh5: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.25rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.25rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.5rem',
        },
    },
    typographyh6: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.25rem',
        },
    },
    typography: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem',
        }
    },
}));

export default useStyles;