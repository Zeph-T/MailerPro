import React from "react";
import { MenuItem, Select } from "@mui/material";

const StyledMUISelect = ({ sx, options, ...props }) => {
  return (
    <Select
      sx={{
        borderRadius: "1rem",
        ...sx,
      }}
      {...props}
    >
      {options?.map((option) => {
        return <MenuItem value={option.value}>{option.label}</MenuItem>;
      })}
    </Select>
  );
};

export default StyledMUISelect;
