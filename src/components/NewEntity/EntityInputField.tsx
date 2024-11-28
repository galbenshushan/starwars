import React from "react";
import { FormControl, FormLabel, Input, Grid } from "@mui/material";
import { capitalize } from "../../utils/Strings";

interface EntityInputFieldProps {
  keyToUse: string;
  entityFieldsConfig: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EntityInputField: React.FC<EntityInputFieldProps> = ({
  keyToUse,
  entityFieldsConfig,
  handleInputChange,
}) => {
  return (
    <Grid item xs={6}>
      <FormControl sx={{ width: "100%" }}>
        <FormLabel
          htmlFor={keyToUse}
          sx={{ color: "white", marginBottom: "5px" }}
        >
          {capitalize(keyToUse.replace(/_/g, " "))}
        </FormLabel>
        <Input
          autoComplete="off"
          id={keyToUse}
          name={keyToUse}
          value={entityFieldsConfig[keyToUse] || ""}
          onChange={handleInputChange}
          fullWidth
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
    </Grid>
  );
};

export default EntityInputField;
