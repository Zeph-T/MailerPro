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
import FileUpload from "../../Components/PopUps/FileUpload/FileUpload";
import ManageCustomFields from "../../Components/PopUps/ManageCustomFields";
import Progress from "../../Utils/helper/linearProgress";

const TEMP_DIR_HIGHLIGHTS_DATA = {
  total: 59874,
  inactive: 9522,
  unsubscribed: 950,
};

function Directory() {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [currentData, setCurrentData] = React.useState([]);
  const [highlightData, setHighlightData] = React.useState({
    total: 0,
    unsubscribed: 0,
  });
  const [currentPage, setCurrentPage] = React.useState(0);

  React.useEffect(() => {
    fetchCurrentPageData();
  }, [currentPage]);

  const fetchCurrentPageData = async () => {
    try {
      const response = await getContactsList(userData.accessToken, currentPage);
      console.log(response);
      const currentDataLocale = response.data.contacts.map((contact) => {
        return {
          ...contact,
          tags: contact.tags.map((tag) => {
            return {
              _id: tag,
              name: userData.tags.find((t) => t._id === tag)?.name,
            };
          }),
        };
      });

      setCurrentData(currentDataLocale);
      setHighlightData({
        total: response.data.count.total,
        unsubscribed: response.data.count.totalUnsubscribed,
      });
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
                color="buttonGrey"
                onClick={() => {
                  dispatch({
                    type: UPDATE_POPUP_STATE,
                    payload: {
                      open: true,
                      component: (
                        <ManageCustomFields
                          fetchCurrentPageData={fetchCurrentPageData}
                        />
                      ),
                    },
                  });
                }}
              >
                {DIRECTORY_PAGE_DATA.navButtons.manageCustomFields}
              </StyledMUIButton>
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
                      component: (
                        <AddContacts
                          fetchCurrentPageData={fetchCurrentPageData}
                          isContactDetails={false}
                        />
                      ),
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
                onClick={() => {
                  dispatch({
                    type: UPDATE_POPUP_STATE,
                    payload: {
                      open: true,
                      component: <FileUpload />,
                    },
                  });
                }}
              >
                {DIRECTORY_PAGE_DATA.navButtons.importContacts}
              </StyledMUIButton>
            </div>
          }
        />
      </div>
      <div className={styles.HighlightsList}>
        {}
        {DIRECTORY_PAGE_DATA.highlightsData.map((highlight, index) => {
          return (
            <>
              <div
                className={styles.HighlightItem}
                style={{
                  backgroundColor: highlight.backgroundColor,
                  borderColor: highlight.resultColor,
                  color: highlight.resultColor,
                }}
              >
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
        {currentData.length > 0 ? (
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
                  <TableRow
                    key={index}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      dispatch({
                        type: UPDATE_POPUP_STATE,
                        payload: {
                          open: true,
                          component: (
                            <AddContacts
                              fetchCurrentPageData={fetchCurrentPageData}
                              isContactDetails={true}
                              contactData={row}
                            />
                          ),
                        },
                      });
                    }}
                  >
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
                  count={highlightData.total}
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
        ) : (
          <Progress />
        )}
      </div>
    </div>
  );
}

export default Directory;
