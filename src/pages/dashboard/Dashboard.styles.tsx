import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: '30px',
        textAlign: 'center',
    },
    "@media (max-width: 650px)": {
        flexContainer: {
            flexDirection: 'column',
        }
    }
}));

export default useStyles;
