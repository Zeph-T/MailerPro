import React from "react";

import styles from "./Directory.module.css";
import Header from "../../Components/Header/index";
import { DIRECTORY_PAGE_DATA } from "../../Utils/staticData";
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

const TEMP_TABLE_DIRECTORY_DATA = new Array(45).fill({}).map((_, index) => {
  return {
    _id: index,
    mail: `mail${index}@gmail.com`,
    tags: ["coffee", "tea"],
    status: Math.random() > 0.5 ? "success" : "faiure",
    added: Date.now(),
    updated: Date.now(),
  };
});

function Directory() {
  const [currentData, setCurrentData] = React.useState(
    TEMP_TABLE_DIRECTORY_DATA.slice(0, 10)
  );
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalItemsCount, setTotalItemsCount] = React.useState(
    TEMP_TABLE_DIRECTORY_DATA.length
  );

  React.useEffect(() => {
    setCurrentData(
      TEMP_TABLE_DIRECTORY_DATA.slice(currentPage * 10, (currentPage + 1) * 10)
    );
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <div className={styles.HeaderSec}>
        <Header
          title={DIRECTORY_PAGE_DATA.title}
          subTitle={"Create reusable templates"}
          rightSecContent={
            <div className={styles.NavRightwrapper}>
              <StyledMUIButton
                style={{
                  padding: "0.8rem 1.5rem",
                }}
                color="buttonOrange"
              >
                {DIRECTORY_PAGE_DATA.navButtons.manageTags}
              </StyledMUIButton>
              <StyledMUIButton
                style={{
                  padding: "0.8rem 1.5rem",
                }}
              >
                {DIRECTORY_PAGE_DATA.navButtons.importContacts}
              </StyledMUIButton>
            </div>
          }
        />
      </div>
      <div className={styles.ContentWrapper}>
        <TableContainer>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                {DIRECTORY_PAGE_DATA.tableData.map((item, index) => {
                  return (
                    <TableCell
                      align={
                        index === DIRECTORY_PAGE_DATA.tableData.length - 1
                          ? "right"
                          : "left"
                      }
                    >
                      {item.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((row) => (
                <TableRow key={row.name}>
                  {DIRECTORY_PAGE_DATA.tableData.map((item, index) => {
                    return (
                      <TableCell
                        align={
                          index === DIRECTORY_PAGE_DATA.tableData.length - 1
                            ? "right"
                            : "left"
                        }
                      >
                        {item.renderer(row)}
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

export default Directory;
