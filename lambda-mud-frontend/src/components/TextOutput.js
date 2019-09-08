import React from "react";
import { CardText } from "material-ui/Card";

// This component handles the text ouput section of the game, which it receives through props
// Players and messages are only displayed if they exist
const TextOutput = props => {
  return (
    <div>
      <CardText>
        <div style={{ height: "20px" }}>
          <h4 style={{ fontFamily: "Magic" }}>{props.broadcast}</h4>
        </div>
      </CardText>
    </div>
  );
};

export default TextOutput;
