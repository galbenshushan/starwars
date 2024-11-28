import React from "react";
import { Box } from "@mui/material";
import UrlItem from "./UrlItem"; 

interface InfoUrlsSectionProps {
  entityToDisplay: { [key: string]: string | string[] };
  handleUrlClick: (url: string, label: string) => void;
}

const InfoUrlsSection: React.FC<InfoUrlsSectionProps> = ({
  entityToDisplay,
  handleUrlClick,
}) => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      {Object.entries(entityToDisplay)
        .filter(
          ([, value]) => typeof value === "string" && value.startsWith("http")
        )
        .map(([key, value]) => (
          <UrlItem
            key={key}
            keyToDisplay={key}
            value={value}
            handleUrlClick={handleUrlClick}
          />
        ))}

      {Object.entries(entityToDisplay)
        .filter(
          ([, value]) =>
            Array.isArray(value) &&
            value.every((v) => typeof v === "string" && v.startsWith("http"))
        )
        .map(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            return (
              <UrlItem
                key={key}
                keyToDisplay={key}
                value={value}
                handleUrlClick={handleUrlClick}
              />
            );
          }
          return null;
        })}
    </Box>
  );
};

export default InfoUrlsSection;
