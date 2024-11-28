import React from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Box } from "@mui/material";
import Title from "../components/UI/Title";
import { swapiStore } from "../stores/SwapiStore";
import { capitalize } from "../utils/Strings";
import InformationCardDialog from "../components/Cards/InformationCardDialog/InformationCardDialog";
import { Option } from "../types/apiTypes";
import NoDataCategory from "../components/EmptyStates/NoDataCategory";
import { Container } from "./GlobalPagesStyles";
import InformationCard from "../components/Cards/InformationCard.ts/InformationCard";

const CategoryPage: React.FC = observer(() => {
  const { category } = useParams();

  const entities: Option[] =
    swapiStore.entities.find((item) => item.category === category)?.data || [];

  return (
    <Box sx={{ padding: "20px", color: "white" }}>
      <Title variant="h4">{category && capitalize(category)} Page</Title>
      <Container>
        {entities.length > 0 ? (
          entities.map((entity: Option, index: number) => (
            <InformationCard
              key={index}
              entity={entity}
              handleShowMore={swapiStore.handleShowMore}
            />
          ))
        ) : (
          <NoDataCategory text="No data available for this category." />
        )}
      </Container>
      <InformationCardDialog selectedOption={swapiStore.selectedOption} />
    </Box>
  );
});

export default CategoryPage;
