import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StyledMUITextField } from "./";

const StyledMUIDatePicker = ({ ...props }) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          inputFormat="dd/MM/yyyy"
          {...props}
          renderInput={(params) => <StyledMUITextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

export default StyledMUIDatePicker;
