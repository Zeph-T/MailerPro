import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const StyledMUISelectWithChip = ({
  label,
  placeholder,
  chipClass,
  handleDelete,
  ...props
}) => {
  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      sx={{
        fontSize: "var(--font-16) !important",
      }}
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            style: {
              ...params.InputProps.style,
              fontSize: 16,
              borderRadius: 8,
            },
          }}
          InputLabelProps={{
            ...params.InputLabelProps,
            style: {
              ...params.InputLabelProps.style,
              fontSize: 16,
            },
          }}
          label={label}
          placeholder={placeholder}
        />
      )}
      ChipProps={{
        sx: { fontSize: 12 },
      }}
      ListboxProps={{
        sx: { fontSize: 14 },
      }}
    />
  );
};

export default StyledMUISelectWithChip;
