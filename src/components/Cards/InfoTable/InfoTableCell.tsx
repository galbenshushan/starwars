import React from "react";
import { Typography, TableCell } from "@mui/material";
import { capitalize } from "../../../utils/Strings";
import { getDateDisplayValue } from "../../../utils/Dates";
import { cellStyles } from "./styles";

interface InfoTableCellProps {
  keyToUse: string;
  value: string;
  formatString?: string;
}

const InfoTableCell: React.FC<InfoTableCellProps> = ({
  keyToUse,
  value,
  formatString = "dd/MM/YYYY",
}) => {
  if (!keyToUse) {
    return null;
  }

  const formattedValue =
    value && value.startsWith("http")
      ? value
      : isNaN(Date.parse(value))
      ? capitalize(value)
      : getDateDisplayValue(value, formatString);

      
  if (!formattedValue) return null;
  return (
    <TableCell sx={cellStyles.tableCell}>
      <Typography sx={cellStyles.keyText}>{keyToUse}:</Typography>
      <Typography sx={cellStyles.valueText}>{formattedValue}</Typography>
    </TableCell>
  );
};

export default InfoTableCell;
