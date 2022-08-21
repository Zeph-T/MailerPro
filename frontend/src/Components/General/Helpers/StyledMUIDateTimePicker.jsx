import React from "react";
// import DateTimePicker from "@mui/x-date-pickers/DateTimePicker";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StyledMUITextField } from ".";

const StyledMUIDateTimePicker = ({ ...props }) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(params) => <StyledMUITextField {...params} />}
          inputFormat="dd/MM/yyyy hh:mm a"
          {...props}
        />
      </LocalizationProvider>
    </>
  );
};

export default StyledMUIDateTimePicker;
