import React from "react";
import { Button } from "@mui/material";

const StyledMUIButton = ({ children, style, ...props }) => {
  return (
    <>
      <Button
        variant="outlined"
        style={{
          fontSize: "1.6rem",
          textTransform: "none",
          padding: "1.2rem 2.5rem",
          borderRadius: "1rem",
          fontWeight: 400,
          borderWidth: "0.16rem",
          ...style,
        }}
        {...props}
      >
        {children}
      </Button>
    </>
  );
};

export default StyledMUIButton;
