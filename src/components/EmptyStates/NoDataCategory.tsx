import { Typography } from "@mui/material";
import React from "react";

interface NoDataCategoryProps {
  text: string;
}
const NoDataCategory: React.FC<NoDataCategoryProps> = ({ text }) => {
  return <Typography>{text}</Typography>;
};

export default NoDataCategory;
