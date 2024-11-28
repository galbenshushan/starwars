import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { appStore } from "../../stores/AppStore";
import { styles } from "./AutocompleteStyles";
import { v4 as uuidv4 } from "uuid";
import { swapiStore } from "../../stores/SwapiStore";
import { Option } from "../../types/apiTypes";

interface AutocompleteBarProps {
  filteredByCategory: Option[];
  handleOptionSelect: (e: any, value: any) => void;
  setQuery: (query: string) => void;
}
const AutocompleteBar: React.FC<AutocompleteBarProps> = ({
  filteredByCategory,
  handleOptionSelect,
  setQuery,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  return (
    <Autocomplete
      sx={{ flex: 3 }}
      freeSolo
      options={filteredByCategory}
      getOptionLabel={(option: any) =>
        option?.name || option?.title || swapiStore?.selectedOption?.name || ""
      }
      onInputChange={(_, newInputValue) => setQuery(newInputValue)}
      onChange={handleOptionSelect}
      renderInput={(params) => (
        <TextField
          placeholder="Search..."
          {...params}
          sx={styles.textField}
          onKeyDown={handleKeyDown}
        />
      )}
      renderOption={(props, option) => (
        <li
          {...props}
          key={uuidv4()}
          className="autocomplete-list-item"
          style={styles.menuItem}
        >
          {option.name || option.title}
        </li>
      )}
      loading={appStore.loading}
      classes={{ paper: "autocomplete-paper" }}
    />
  );
};

export default AutocompleteBar;
