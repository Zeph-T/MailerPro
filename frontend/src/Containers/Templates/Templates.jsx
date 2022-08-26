import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import notify from "./../../Utils/helper/notifyToast";
import styles from "./Templates.module.css";
import Header from "./../../Components/Header/index";
import { TEMPLATES_PAGE_DATA } from "./../../Utils/staticData";
import CustomTabs from "../../Components/General";
import StyledMUIButton from "./../../Components/General/Helpers/StyledMUIButton";
import Progress from "../../Utils/helper/linearProgress";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  fetchAllTemplates,
  deleteTemplate,
} from "../../Services/template.service";

const TEMP_TABLE_CONTACTS_DATA = {
  EMAIL: new Array(45).fill({}).map((item, index) => {
    return {
      _id: index,
      name: "Email Template " + index,
    };
  }),
  SMS: new Array(50).fill({}).map((item, index) => {
    return {
      _id: index,
      name: "SMS Template " + index,
    };
  }),
};

function Templates() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const userData = useSelector((state) => state.user?.userData);

  const [currentTab, setCurrentTab] = React.useState(
    TEMPLATES_PAGE_DATA.tabs[0].value
  );
  const [currentData, setCurrentData] = React.useState(
    TEMP_TABLE_CONTACTS_DATA.EMAIL.slice(0, 10)
  );
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalItemsCount, setTotalItemsCount] = React.useState(
    TEMP_TABLE_CONTACTS_DATA.EMAIL.length
  );

  const handleTemplateFetch = async () => {
    try {
      const { data } = await fetchAllTemplates(
        currentTab,
        userData.accessToken,
        currentPage
      );
      setCurrentData(data.data.templates);
      setTotalItemsCount(data.data.total);
    } catch (err) {
      setLoading(false);
      notify("Fetching templated failed", "error");
    }
  };

  React.useEffect(() => {
    setCurrentData([]);
    setLoading(true);
    handleTemplateFetch();
    setLoading(false)
  }, [currentPage, currentTab, userData.accessToken]);

  const handleDeleteTemplate = async (templateId) => {
    try {
      await deleteTemplate(templateId, userData.accessToken);
      setCurrentData([]);
      handleTemplateFetch();
      notify("Template deleted successfully", "success");
    } catch (err) {
      notify("Deleting template failed", "error");
    }
  };

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
                  display: currentTab == "SMS" ? "inline" : "none",
                }}
                color="buttonOrange"
                onClick={() => {
                  navigate("/createsmstemplate");
                }}
              >
                {TEMPLATES_PAGE_DATA.navButtons.createSMSTemplate}
              </StyledMUIButton>
              <StyledMUIButton
                style={{
                  padding: "0.8rem 1.5rem",
                  display: currentTab == "EMAIL" ? "inline" : "none",
                }}
                onClick={() => {
                  navigate("/createtemplate");
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
        {!loading ? (
          <TableContainer>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
                {currentData.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell
                      style={{ width: 160 }}
                      align="right"
                      padding="none"
                    >
                      <div className={styles.IconsOptions}>
                        <div
                          className={styles.IconButtonWrapper}
                          style={{
                            "--bg-color": "#FFF9D8",
                          }}
                          onClick={() => {
                            navigate(
                              currentTab === "EMAIL"
                                ? `/managetemplate/${row._id}`
                                : `/managesmstemplate/${row._id}`
                            );
                          }}
                        >
                          <EditIcon color="buttonYellow" fontSize="small" />
                        </div>
                        <div
                          className={styles.IconButtonWrapper}
                          style={{
                            "--bg-color": "#FFE5E4",
                          }}
                          onClick={() => {
                            handleDeleteTemplate(row._id);
                          }}
                        >
                          <DeleteIcon color="buttonRed" fontSize="small" />
                        </div>
                      </div>
                    </TableCell>
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
        ) : (
          <Progress />
        )}
      </div>
    </div>
  );
}

export default Templates;
