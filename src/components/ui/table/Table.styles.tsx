import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => ({
  dataGrid: {
    height: 510,
    width: '100%',
    border: 'none',
    WebkitFlexDirection: 'row-reverse',
  },
  dataGridContainer: {
    width: '100%',
    overflowX: 'auto',
  },
  contentButtonsActions: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  iconEdit: {
    color: theme.palette.secondary.main,
  },
  iconDetail: {
    color: theme.palette.primary.dark,
  },
  iconDelete: {
    color: theme.palette.error.main,
  }, 
  confirmed: {
    color: theme.palette.success.contrastText,
    backgroundColor: theme.palette.success.light,
    borderRadius: 5,
    padding: 5,
  },
  notConfirmed: {
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.light,
    borderRadius: 5,
    padding: 5,
  },
  iconDisabled:{
    color: theme.palette.action.disabled,
  },
}));

export default useStyles