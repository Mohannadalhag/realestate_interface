import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import { useState } from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import { DialogActions } from '@material-ui/core';
//const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  selected: {
      color:"blue"
  },
  unSelected: {

  },
  TextValidator: {
      margin:"10px"
  }
});

function BaseDialog(props) {
  const classes = useStyles();
  const { onClose, index, selectedValue, open, items, changeType } = props;
  const [formDisplay, setFromDisplay] = useState(false)
  const [customField, setCustomField] = useState("")
  const handleClose = () => {
    onClose(index);
  };

  const handleListItemClick = (item) => {
    onClose(index);
    changeType(index, item);
  };
  const handleSubmitForm = () => {
    setFromDisplay(!formDisplay)
    onClose(index);
    changeType(index, customField);
    setCustomField("")
  };

  const toggleShowForm = (item) => {
      setFromDisplay(!formDisplay)
  };



  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Select Type</DialogTitle>
      {formDisplay?
      <React.Fragment>
      <TextValidator 
          required 
          className={classes.TextValidator}
          name="customField"
          value={customField}
          onChange={e=>{setCustomField(e.target.value)}}
          label="Custom Field" />
          <DialogActions>
            <Button 
                onClick={toggleShowForm}
                color="primary" autoFocus>
                Cancel
            </Button>
            <Button 
                onClick={handleSubmitForm}
                color="primary" autoFocus>
                Ok
            </Button>
          </DialogActions>
    </React.Fragment>
      :
      <List>
        {items.map((item) => (
          <ListItem button onClick={() => handleListItemClick(item)} key={item}>
            <ListItemText className={item===selectedValue?classes.selected:classes.unSelected}>{item}</ListItemText>
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => toggleShowForm()}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add custom type" />
        </ListItem>
      </List>}
    </Dialog>
  );
}

BaseDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
export default BaseDialog;
