import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
}));

export default function InputWithIcon(props) {
  const classes = useStyles();

  return (
    <>
      {/* <Grid container spacing={1} alignItems="flex-end"> */}
      <div className="chat-broadcast" style={{ fontSize: "16px" }}>
        <h2 style={{ fontFamily: "RS9", fontSize: "40px" }}>Room Chat</h2>
        <p style={{ fontSize: "8px !important", fontFamily: "RS5" }}>
          {props.broadcast}
        </p>
      </div>
      <div className="chat-input">
        <div className="account-icon">
          <AccountCircle />
        </div>
        <div className="text-input">
          <TextField
            id="input-with-icon-grid"
            label="Say something..."
            onChange={props.handleInputChange}
            type="text"
            name="text"
            value={props.text}
          />
        </div>
        <div className="chat-button">
          <Button
            size="small"
            variant="contained"
            color="primary"
            label="Send"
            className="send-button"
            onClick={e => {
              console.log("submitted");
              e.preventDefault();
              props.submitHandler();
            }}
          >
            Send
            <SendIcon className={classes.rightIcon}></SendIcon>
          </Button>
        </div>
      </div>
    </>
  );
}
