import React from "react";
import { Typography, Box } from "@mui/material";

interface UrlItemProps {
  keyToDisplay: string;
  value: string | string[];
  handleUrlClick: (url: string, label: string) => void;
}

const UrlItem: React.FC<UrlItemProps> = ({
  keyToDisplay,
  value,
  handleUrlClick,
}) => {
  return (
    <Box sx={{ marginBottom: "15px" }}>
      <Typography
        sx={{
          color: "#F1C40F",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        {keyToDisplay}:
      </Typography>

      <Typography sx={{ color: "#777", fontSize: "16px" }}>
        {Array.isArray(value) ? (
          value.map((item, idx) => (
            <div key={idx} style={{ marginBottom: "5px" }}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleUrlClick(item, item);
                }}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                {item}
              </a>
            </div>
          ))
        ) : (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleUrlClick(value, value);
            }}
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
              textShadow: "0 0 5px rgba(52, 152, 219, 0.7)",
            }}
          >
            {value}
          </a>
        )}
      </Typography>
    </Box>
  );
};

export default UrlItem;
