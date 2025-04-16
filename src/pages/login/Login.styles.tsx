import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
    image: {
        width: '100%',
        height: '100vh',
        objectFit: 'cover',
        objectPosition: 'center'
    },
    logo: {
        width: '22%',
    },
    logoSmall: {
        [theme.breakpoints.down('sm')]: {
          marginTop: '120px',
        },
        [theme.breakpoints.between('md', 'lg')]: {
            marginTop: '120px',
          },
      },
}));

export default useStyles;
