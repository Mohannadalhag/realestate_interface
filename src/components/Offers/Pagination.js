import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
function BasicPagination ({EmployeesPerPage, totalEmployees}) {
    const classes = useStyles();
    
    const [Page,setPage] = useState(1);
    
    return (
        <div className={classes.root}>
            <Pagination showFirstButton showLastButton count={Math.ceil(totalEmployees / EmployeesPerPage)} page={Page} onChange={(event,val)=> setPage(val)} color="primary" />
        </div>
    );
}
export default BasicPagination;
