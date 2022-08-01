import React from "react";
import { FormControlLabel, Typography } from "@mui/material";

const StyledMUIFormControlLabel = ({ label, labelProps, ...props }) => {
  return (
    <FormControlLabel
      label={<Typography {...labelProps}>{label}</Typography>}
      {...props}
    />
  );
};

export default StyledMUIFormControlLabel;
