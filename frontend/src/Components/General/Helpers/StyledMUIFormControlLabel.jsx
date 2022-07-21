import React from "react";
import { FormControlLabel, Typography } from "@mui/material";

const StyledMUIFormControlLabel = ({ fontSize, label, sx, ...props }) => {
  return (
    <FormControlLabel
      label={
        <Typography sx={{ fontSize: fontSize ? fontSize : 16, ...sx }}>
          {label}
        </Typography>
      }
      {...props}
    />
  );
};

export default StyledMUIFormControlLabel;
