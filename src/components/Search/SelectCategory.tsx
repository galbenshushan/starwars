import React from "react";
import {
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { Categories } from "../../enums/apiEnums";
import { styles } from "./AutocompleteStyles";

interface SelectCategoryProps {
  selectedCategory: string;
  handleCategoryChange: (event: SelectChangeEvent<string>) => void;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
  selectedCategory,
  handleCategoryChange,
}) => {
  return (
    <FormControl sx={{ flex: 1 }}>
      <Select
        sx={{
          "&.MuiInputBase-root": {
            marginTop: "0px",
          },
        }}
        variant="standard"
        labelId="category-select-label"
        value={selectedCategory}
        onChange={handleCategoryChange}
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: "black",
            },
          },
        }}
      >
        <MenuItem value="all" sx={{ ...styles.menuItem }}>
          All
        </MenuItem>
        {Object.values(Categories).map((category) => (
          <MenuItem key={category} value={category} sx={{ ...styles.menuItem }}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectCategory;
