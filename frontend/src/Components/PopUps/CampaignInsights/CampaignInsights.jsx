import React, { useEffect } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  CAMPAIGN_INSIGHTS_POPUP_DATA,
  CROSS_ICON,
} from "../../../Utils/staticData";
import { StyledMUISelect } from "../../General/Helpers";

import styles from "./CampaignInsights.module.css";

const TEMP_CAMPAIGN_DATA = new Array(105)
  .fill("")
  .map((_, index) => `tempmail${index}@temp.com`);

console.log(TEMP_CAMPAIGN_DATA);
const NO_OF_ITEEMS_PER_PAGE = 10;

const CampaignInsights = ({ campaignID = "sacgh2s1evhetv14t" }) => {
  const [totalItemsCount, setTotalItemsCount] = React.useState(105);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [currentList, setCurrentList] = React.useState(
    TEMP_CAMPAIGN_DATA.slice(0, NO_OF_ITEEMS_PER_PAGE)
  );
  const [currentFilterType, setCurrentFilterType] = React.useState(
    CAMPAIGN_INSIGHTS_POPUP_DATA.filterOptions[0].value
  );

  console.log(currentFilterType);
  useEffect(() => {
    setCurrentList(
      TEMP_CAMPAIGN_DATA.slice(
        currentPage * NO_OF_ITEEMS_PER_PAGE,
        (currentPage + 1) * NO_OF_ITEEMS_PER_PAGE
      )
    );
  }, [currentPage]);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Header}>
        <div className={styles.HeaderLeft}>
          <h1>{CAMPAIGN_INSIGHTS_POPUP_DATA.title}</h1>
          <span className={styles.IDLabel}>{`ID: ${campaignID}`}</span>
        </div>
        <img src={CROSS_ICON} alt="cross" />
      </div>

      <div className={styles.BottomWrapper}>
        <div className={styles.FilterSection}>
          <StyledMUISelect
            value={currentFilterType}
            options={CAMPAIGN_INSIGHTS_POPUP_DATA.filterOptions}
            onChange={(e) => setCurrentFilterType(e.target.value)}
          />
          <IconButton
            aria-label="Export"
            color="primary"
            className={styles.ExportButton}
          >
            <ExitToAppIcon />
          </IconButton>
        </div>
        <hr />
        <TableContainer>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              {currentList.map((row) => (
                <TableRow key={row}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={styles.ListItemCell}
                  >
                    {row}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                colSpan={3}
                count={totalItemsCount}
                rowsPerPage={NO_OF_ITEEMS_PER_PAGE}
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
};

export default CampaignInsights;
