import React from "react";
import { FormControlLabel, Typography } from "@mui/material";

const StyledMUIFormControlLabel = ({ label, sx, ...props }) => {
  return (
    <FormControlLabel
      label={<Typography sx={{ ...sx }}>{label}</Typography>}
      {...props}
    />
  );
};

export default StyledMUIFormControlLabel;
