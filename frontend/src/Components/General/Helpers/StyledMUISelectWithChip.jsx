import React from "react";
import { Checkbox, ListItemText, MenuItem, Select } from "@mui/material";

const StyledMUISelectWithChip = ({ chipClass, handleDelete, ...props }) => {
  return (
    <Select
      multiple
      onChange={handleChange}
      onOpen={() => console.log("select opened")}
      IconComponent={KeyboardArrowDownIcon}
      renderValue={(selected) => (
        <div className={classes.chips}>
          {selected.map((value) => (
            <Chip
              key={value}
              label={value}
              clickable
              // deleteIcon={
              //   <CancelIcon onMouseDown={(event) => event.stopPropagation()} />
              // }
              className={chipClass}
              onDelete={(e) => handleDelete(e, value)}
              onClick={() => console.log("clicked chip")}
            />
          ))}
        </div>
      )}
      {...props}
    >
      {names.map((name) => (
        <MenuItem key={name} value={name}>
          <Checkbox checked={personName.includes(name)} />
          <ListItemText primary={name} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default StyledMUISelectWithChip;
