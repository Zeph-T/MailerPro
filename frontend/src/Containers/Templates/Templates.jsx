import React from "react";

import styles from "./Templates.module.css";
import Header from "./../../Components/Header/index";
import { TEMPLATES_PAGE_DATA } from "./../../Utils/staticData";
import CustomTabs from "../../Components/General";
import StyledMUIButton from "./../../Components/General/Helpers/StyledMUIButton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";

const TEMP_TABLE_CONTACTS_DATA = {
  email: new Array(50).fill({}).map((item, index) => {
    return {
      _id: index,
      name: "Email Template " + index,
    };
  }),
  sms: new Array(50).fill({}).map((item, index) => {
    return {
      _id: index,
      name: "SMS Template " + index,
    };
  }),
};

function Templates() {
  const [currentTab, setCurrentTab] = React.useState(
    TEMPLATES_PAGE_DATA.tabs[0].value
  );
  const [currentData, setCurrentData] = React.useState(
    TEMP_TABLE_CONTACTS_DATA.email.slice(0, 10)
  );
  const [currentPage, setCurrentPage] = React.useState(0);

  React.useEffect(() => {
    setCurrentData(
      TEMP_TABLE_CONTACTS_DATA[currentTab].slice(
        currentPage * 10,
        (currentPage + 1) * 10
      )
    );
  }, [currentPage, currentTab]);

  return (
    <div className={styles.container}>
      <div className={styles.HeaderSec}>
        <Header
          title={TEMPLATES_PAGE_DATA.title}
          subTitle={"Create reusable templates"}
          rightSecContent={
            <div className={styles.NavRightwrapper}>
              <StyledMUIButton
                style={{
                  padding: "0.8rem 1.5rem",
                }}
                color="buttonOrange"
              >
                {TEMPLATES_PAGE_DATA.navButtons.createSMSTemplate}
              </StyledMUIButton>
              <StyledMUIButton
                style={{
                  padding: "0.8rem 1.5rem",
                }}
              >
                {TEMPLATES_PAGE_DATA.navButtons.createEmailTemplate}
              </StyledMUIButton>
            </div>
          }
        />
        <CustomTabs
          tabsData={TEMPLATES_PAGE_DATA.tabs}
          currentTab={currentTab}
          handleClick={(val) => {
            setCurrentTab(val);
            setCurrentPage(0);
          }}
        />
      </div>
      <div className={styles.ContentWrapper}>
        <TableContainer>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              {currentData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {"10"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                colSpan={3}
                count={50}
                rowsPerPage={10}
                page={currentPage}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                rowsPerPageOptions={[]}
                onPageChange={(e, newPage) => {
                  setCurrentPage(newPage);
                }}
                sx={{
                  borderBottom: "none",
                }}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Templates;
