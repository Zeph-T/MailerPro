import React from "react";
import { Radio } from "@mui/material";

const StyledMUIRadio = ({ fontSize, ...props }) => {
  return (
    <Radio
      sx={{
        "& .MuiSvgIcon-root": {
          fontSize: fontSize ? fontSize : 25,
        },
      }}
      {...props}
    />
  );
};

export default StyledMUIRadio;
