import React from 'react';
import { useHistory } from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
    pagination: {    
      flexGrow: 1,
      maxWidth: 250,
      minWidth:250,
    }
  }));
function BasicPagination ({count, page, setPage}) {
    const classes = useStyles();
    const history = useHistory();
    
    
    return (
        <div className={classes.pagination}>
            <Pagination showFirstButton showLastButton count={count} page={page} color="primary" 
            boundaryCount={2}
            siblingCount={1}
            onChange={(event,val)=> {
              setPage(val)
              history.push("?page="+val)
            }} 
            />
        </div>
    );
}
export default BasicPagination;
