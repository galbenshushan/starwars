import { Typography, TypographyProps } from "@mui/material";
import React from "react";

interface TitleProps {
  children: React.ReactNode;
  variant?: TypographyProps["variant"];
}

const Title: React.FC<TitleProps> = ({ children, variant = "inherit" }) => {
  return (
    <Typography variant={variant} gutterBottom textAlign="center">
      {children}
    </Typography>
  );
};

export default Title;
