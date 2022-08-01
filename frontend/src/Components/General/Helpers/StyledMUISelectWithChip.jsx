import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const StyledMUISelectWithChip = ({ label, placeholder, ...props }) => {
  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      {...props}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
};

export default StyledMUISelectWithChip;
