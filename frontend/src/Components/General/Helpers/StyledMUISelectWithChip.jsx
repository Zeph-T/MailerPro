import React from "react";
import { Autocomplete } from "@mui/material";
import { StyledMUITextField } from "./";

const StyledMUISelectWithChip = ({ label, placeholder, ...props }) => {
  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      {...props}
      renderInput={(params) => (
        <StyledMUITextField
          {...params}
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default StyledMUISelectWithChip;
