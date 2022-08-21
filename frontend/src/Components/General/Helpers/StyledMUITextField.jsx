import React from "react";
import { TextField } from "@mui/material";

const StyledMUITextField = ({ borderRadius, ...props }) => {
  return (
    <TextField
      InputProps={{
        ...props.InputProps,
        style: {
          ...props.InputProps?.style,
          borderRadius: borderRadius ? borderRadius : 8,
        },
      }}
      fullWidth
      {...props}
    />
  );
};

export default StyledMUITextField;
