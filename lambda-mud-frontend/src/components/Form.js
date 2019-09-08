import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FlatButton from "material-ui/FlatButton";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function InputWithIcon(props) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              id="input-with-icon-grid"
              label="Say something..."
              onChange={props.handleInputChange}
              type="text"
              name="text"
              value={props.text}
            />
          </Grid>
          <FlatButton
            label="Send"
            className="submit-button"
            onClick={e => {
              console.log("submitted");
              e.preventDefault();
              props.submitHandler();
            }}
          />
        </Grid>
      </div>
    </div>
  );
}
