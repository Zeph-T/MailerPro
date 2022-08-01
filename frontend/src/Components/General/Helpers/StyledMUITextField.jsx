import React from "react";
import { TextField } from "@mui/material";

const StyledMUITextField = ({ inputStyles, borderRadius, ...props }) => {
  return (
    <TextField
      InputProps={{
        style: {
          borderRadius: borderRadius ? borderRadius : 8,
          ...inputStyles,
        },
      }}
      fullWidth
      {...props}
    />
  );
};

export default StyledMUITextField;
