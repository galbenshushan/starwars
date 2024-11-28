import React, { useState, useEffect } from "react";
import { Box, SelectChangeEvent } from "@mui/material";
import { swapiStore } from "../stores/SwapiStore";
import { observer } from "mobx-react-lite";
import { appStore } from "../stores/AppStore";
import Title from "../components/UI/Title";
import SearchAutocomplete from "../components/Search/SearchAutocomplete";
import { Option } from "../types/apiTypes";
import InformationCardDialog from "../components/Cards/InformationCardDialog/InformationCardDialog";
import { Container } from "./GlobalPagesStyles";
import NoDataCategory from "../components/EmptyStates/NoDataCategory";
import InformationCard from "../components/Cards/InformationCard.ts/InformationCard";

const SearchPage: React.FC = observer(() => {
  const [query, setQuery] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const onQueryChange = () => {
    if (query.trim() === "") {
      setFilteredResults([]);
    }
    const results: Option[] = swapiStore.serializeEntitiesForSearch(query);
    setFilteredResults(results);
  };

  useEffect(() => onQueryChange(), [query, swapiStore.entities]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <InformationCardDialog selectedOption={swapiStore.selectedOption} />
      <Box sx={{ padding: "20px" }}>
        <Title variant="h4">Star Wars Search</Title>
        <SearchAutocomplete
          handleCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
          query={query}
          setQuery={setQuery}
          filteredResults={filteredResults}
        />
        {!appStore.loading && filteredResults.length === 0 && query && (
          <NoDataCategory text="No results found" />
        )}
        <Container>
          <InformationCard
            entity={swapiStore.selectedOption}
            handleShowMore={() => swapiStore.setOpenModal(true)}
          />
        </Container>
      </Box>
    </>
  );
});

export default SearchPage;
