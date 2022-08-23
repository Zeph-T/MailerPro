import React from "react";
import { CAMPAIGN_DATA, TEMPLATES_PAGE_DATA } from "./../../Utils/staticData";
import Header from "../../Components/Header";
import StyledMUIButton from "../../Components/General/Helpers/StyledMUIButton";
import styles from "./Campaign.module.css";
import CustomTabs from "../../Components/General";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";

function Campaign() {
  const [campaignData, setCampaignData] = React.useState([]);
  const [currentTab, setCurrentTab] = React.useState(
    TEMPLATES_PAGE_DATA.tabs[0].value
  );
  const [currentPage, setCurrentPage] = React.useState(0);
  const [currentData, setCurrentData] = React.useState(
    TEMPLATES_PAGE_DATA.TableData.slice(0, 10)
  );

  useEffect(() => {
    const fetchData = () => {
      //fetch campaign data from backend
      //for now um using local data imported from utils
      setCampaignData(CAMPAIGN_DATA.TableData);
      console.log(CAMPAIGN_DATA.TableData); 
    };
    fetchData();
  }, [campaignData]);

  return (
    <div>
      <Header
        title={CAMPAIGN_DATA.CampaignTitle}
        subTitle={CAMPAIGN_DATA.CampaignSubTitle}
        rightSecContent={
          <div className={styles.NavRightwrapper}>
            <StyledMUIButton color="buttonOrange">
              {" "}
              {CAMPAIGN_DATA.CreateEmailCampaign}{" "}
            </StyledMUIButton>
            <StyledMUIButton>
              {" "}
              {CAMPAIGN_DATA.CreateSMSCampaign}{" "}
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
      <div>
        <TableContainer>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              {campaignData.length>0 && campaignData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell
                    style={{ width: 160 }}
                    align="right"
                    padding="none"
                  >
                
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
      </div>
    </div>
  );
}

export default Campaign;
