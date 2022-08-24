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
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_POPUP_STATE } from "../../Redux/ActionTypes";
import ManageTags from "../../Components/PopUps/ManageTags";
import { getContactsList } from "../../Services/contact.service";
import notify from "./../../Utils/helper/notifyToast";
import AddContacts from "./../../Components/PopUps/AddContacts/AddContacts";

const TEMP_DIR_HIGHLIGHTS_DATA = {
  total: 59874,
  inactive: 9522,
  unsubscribed: 950,
};

function Directory() {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [currentData, setCurrentData] = React.useState([]);
  const [highlightData, setHighlightData] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalItemsCount, setTotalItemsCount] = React.useState(0);

  React.useEffect(() => {
    setHighlightData(TEMP_DIR_HIGHLIGHTS_DATA);
  }, []);

  React.useEffect(() => {
    fetchCurrentPageData();
  }, [currentPage]);

  const fetchCurrentPageData = async () => {
    try {
      const response = await getContactsList(userData.accessToken, currentPage);
      console.log(response);
      setTotalItemsCount(response.data.count);
      setCurrentData(response.data.contcts);
    } catch (err) {
      console.log(err);
      notify("Internal Server Error", "error");
    }
  };

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
                color="buttonGreen"
                onClick={() => {
                  dispatch({
                    type: UPDATE_POPUP_STATE,
                    payload: {
                      open: true,
                      component: <AddContacts />,
                    },
                  });
                }}
              >
                {DIRECTORY_PAGE_DATA.navButtons.addContact}
              </StyledMUIButton>
              <StyledMUIButton
                style={{
                  padding: "0.8rem 1.5rem",
                }}
                color="buttonOrange"
                onClick={() => {
                  dispatch({
                    type: UPDATE_POPUP_STATE,
                    payload: {
                      open: true,
                      component: <ManageTags />,
                    },
                  });
                }}
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
      <div className={styles.HighlightsList}>
        {DIRECTORY_PAGE_DATA.highlightsData.map((highlight, index) => {
          return (
            <>
              <div className={styles.HighlightItem}>
                {`${highlight.label}: `}
                <span
                  style={{
                    color: highlight.resultColor,
                  }}
                >
                  {highlightData[highlight.accessor]}
                </span>
              </div>
            </>
          );
        })}
      </div>
      <div className={styles.ContentWrapper}>
        <TableContainer>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                {DIRECTORY_PAGE_DATA.tableData.map((columnInfo, index) => {
                  return (
                    <TableCell
                      align={
                        index === DIRECTORY_PAGE_DATA.tableData.length - 1
                          ? "right"
                          : index === 0
                          ? "left"
                          : "center"
                      }
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
                  {DIRECTORY_PAGE_DATA.tableData.map((columnInfo, index) => {
                    return (
                      <TableCell
                        align={
                          index === DIRECTORY_PAGE_DATA.tableData.length - 1
                            ? "right"
                            : index === 0
                            ? "left"
                            : "center"
                        }
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
