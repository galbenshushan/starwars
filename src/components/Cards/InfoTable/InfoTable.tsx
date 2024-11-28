import React from "react";
import { Box, Table, TableBody, TableContainer, TableRow } from "@mui/material";
import { Option } from "../../../types/apiTypes";
import InfoTableCell from "./InfoTableCell";
import { tableStyles } from "./styles";

interface InfoTableProps {
  entityToDisplay: Option;
}

const InfoTable: React.FC<InfoTableProps> = ({ entityToDisplay }) => {
  const isValidTableField = (key: string, value: any): boolean =>
    key !== "opening_crawl" &&
    typeof value === "string" &&
    !value.startsWith("http") &&
    key !== "title" &&
    key !== "name";

  return (
    <Box sx={tableStyles.box}>
      <TableContainer sx={tableStyles.tableContainer}>
        <Table>
          <TableBody>
            <TableRow sx={tableStyles.tableRow}>
              {Object.entries(entityToDisplay)
                .filter(([key, value]) => isValidTableField(key, value))
                .map(([key, value]) => (
                  <InfoTableCell
                    key={key}
                    keyToUse={key.replace(/_/g, " ")}
                    value={value as string}
                  />
                ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InfoTable;
