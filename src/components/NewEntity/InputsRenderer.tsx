import React from "react";
import { Box, FormControl, FormLabel, Input, Grid } from "@mui/material";
import { capitalize } from "../../utils/Strings";
import EntityInputField from "./EntityInputField";

interface InputsRendererProps {
  templateEntity: any;
  entityFieldsConfig: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputsRenderer: React.FC<InputsRendererProps> = ({
  templateEntity,
  entityFieldsConfig,
  handleInputChange,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: "0 20px" }}>
      {templateEntity && (
        <>
          <FormControl
            sx={{ display: "flex", marginBottom: "15px", width: "100%" }}
          >
            <FormLabel
              htmlFor="name"
              sx={{ color: "white", marginBottom: "5px", width: "100%" }}
            >
              {capitalize("name")}
            </FormLabel>
            <Input
              id="name"
              name="name"
              value={entityFieldsConfig["name"] || ""}
              onChange={handleInputChange}
              fullWidth
              autoComplete="off"
              sx={{
                color: "white",
                backgroundColor: "black",
                paddingLeft: "10px",
                paddingRight: "10px",
                borderRadius: "4px",
                "&:focus": {
                  boxShadow: "0 0 6px 6px rgba(255, 255, 255, 0.6)",
                },
              }}
            />
          </FormControl>

          <Grid container spacing={2}>
            {Object.entries(templateEntity).map(
              ([key, defaultValue]) =>
                typeof defaultValue !== "object" &&
                !Array.isArray(defaultValue) &&
                key !== "name" && (
                  <EntityInputField
                    keyToUse={key}
                    key={key}
                    entityFieldsConfig={entityFieldsConfig}
                    handleInputChange={handleInputChange}
                  />
                )
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default InputsRenderer;
