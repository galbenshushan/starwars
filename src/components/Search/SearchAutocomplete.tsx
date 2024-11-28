import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { Option } from "../../types/apiTypes";
import { styles } from "./AutocompleteStyles";
import { swapiStore } from "../../stores/SwapiStore";
import SelectCategory from "./SelectCategory";
import AutocompleteBar from "./AutocompleteBar";

interface SearchAutocompleteProps {
  query: string;
  setQuery: (query: string) => void;
  filteredResults: any[];
  selectedCategory: string;
  handleCategoryChange: (event: any) => void;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  query,
  setQuery,
  filteredResults,
  handleCategoryChange,
  selectedCategory,
}) => {
  const enterButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleOptionSelect = (event: any, value: string | Option) => {
    if (!value) return;
    const optionValue = (value as Option).name || (value as Option).title;
    const searchValue = optionValue ? optionValue : value;

    const option = filteredResults.find((option: Option) =>
      (option.name || option.title)
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
    swapiStore.setSelectedOption(option);
  };

  useEffect(() => {
    if (swapiStore.selectedOption && enterButtonRef.current) {
      enterButtonRef.current.focus();
    }
  }, [swapiStore.selectedOption]);

  const filteredByCategory =
    selectedCategory === "all"
      ? filteredResults
      : filteredResults.filter(
          (item: Option) => item.category === selectedCategory
        );

  return (
    <Box sx={{ ...styles.box, display: "flex", gap: 2 }}>
      <SelectCategory
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />
      <AutocompleteBar
        filteredByCategory={filteredByCategory}
        handleOptionSelect={handleOptionSelect}
        setQuery={setQuery}
      />
    </Box>
  );
};

export default SearchAutocomplete;
