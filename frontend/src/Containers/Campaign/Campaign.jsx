import React from "react";

import styles from "./Campaign.module.css";
import Header from "../../Components/Header/index";
import { CAMPAIGN_DATA } from "../../Utils/staticData";
import CustomTabs from "../../Components/General";
import StyledMUIButton from "../../Components/General/Helpers/StyledMUIButton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TEMP_TABLE_CONTACTS_DATA = {
  email: new Array(45).fill({}).map((_, index) => {
    return {
      _id: index,
      mail: `MAILtempmail${index}@gmail.com`,
      totalSent: Math.floor(Math.random() * 1000) + 10,
      fail: Math.floor(Math.random() * 1000) + 10,
      opens: Math.floor(Math.random() * 1000) + 10,
      clicks: Math.floor(Math.random() * 1000) + 10,
      bounces: Math.floor(Math.random() * 1000) + 10,
      unsubscribes: Math.floor(Math.random() * 1000) + 10,
    };
  }),
  sms: new Array(45).fill({}).map((_, index) => {
    return {
      _id: index,
      mail: `SMStempmail${index}@gmail.com`,
      totalSent: Math.floor(Math.random() * 1000) + 10,
      fail: Math.floor(Math.random() * 1000) + 10,
      opens: Math.floor(Math.random() * 1000) + 10,
      clicks: Math.floor(Math.random() * 1000) + 10,
      bounces: Math.floor(Math.random() * 1000) + 10,
      unsubscribes: Math.floor(Math.random() * 1000) + 10,
    };
  }),
};

function Campaign() {
  const [currentTab, setCurrentTab] = React.useState(
    CAMPAIGN_DATA.tabs[0].value
  );
  const [currentData, setCurrentData] = React.useState(
    TEMP_TABLE_CONTACTS_DATA.email.slice(0, 10)
  );
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalItemsCount, setTotalItemsCount] = React.useState(
    TEMP_TABLE_CONTACTS_DATA.email.length
  );

  React.useEffect(() => {
    setCurrentData(
      TEMP_TABLE_CONTACTS_DATA[currentTab].slice(
        currentPage * 10,
        (currentPage + 1) * 10
      )
    );
  }, [currentPage, currentTab]);

  React.useEffect(() => {
    setTotalItemsCount(TEMP_TABLE_CONTACTS_DATA[currentTab]?.length);
  }, [currentTab]);

  return (
    <div className={styles.container}>
      <div className={styles.HeaderSec}>
        <Header
          title={CAMPAIGN_DATA.title}
          subTitle={"Create reusable templates"}
          rightSecContent={
            <div className={styles.NavRightwrapper}>
              <StyledMUIButton
                style={{
                  padding: "0.8rem 1.5rem",
                }}
                color="buttonOrange"
              >
                {CAMPAIGN_DATA.createSMSCampaign}
              </StyledMUIButton>
              <StyledMUIButton
                style={{
                  padding: "0.8rem 1.5rem",
                }}
              >
                {CAMPAIGN_DATA.createEmailCampaign}
              </StyledMUIButton>
            </div>
          }
        />
        <CustomTabs
          tabsData={CAMPAIGN_DATA.tabs}
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
            <TableHead>
              <TableRow>
                {CAMPAIGN_DATA.tableData.map((columnInfo, index) => {
                  return (
                    <TableCell
                      align={columnInfo.align}
                      width={columnInfo.width}
                    >
                      {columnInfo.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((row, index) => (
                <TableRow key={index}>
                  {CAMPAIGN_DATA.tableData.map((columnInfo, index) => {
                    return (
                      <TableCell
                        align={columnInfo.align}
                        width={columnInfo.width}
                      >
                        {columnInfo.renderer(row)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                colSpan={3}
                count={totalItemsCount}
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

export default Campaign;
