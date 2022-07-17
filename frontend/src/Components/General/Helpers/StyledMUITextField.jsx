import React from "react";
import { TextField } from "@mui/material";

const StyledMUITextField = ({ fontSize, borderRadius, ...props }) => {
  return (
    <TextField
      InputProps={{
        style: {
          fontSize: fontSize ? fontSize : 16,
          borderRadius: borderRadius ? borderRadius : 8,
        },
      }}
      InputLabelProps={{ style: { fontSize: fontSize ? fontSize : 16 } }}
      fullWidth
      {...props}
    />
  );
};

export default StyledMUITextField;
