import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Box, Button } from "@mui/material";
import Title from "../components/UI/Title";
import { swapiStore } from "../stores/SwapiStore";
import { capitalize } from "../utils/Strings";
import InformationCardDialog from "../components/Cards/InformationCardDialog/InformationCardDialog";
import { Option } from "../types/apiTypes";
import NoDataCategory from "../components/EmptyStates/NoDataCategory";
import { Container } from "./GlobalPagesStyles";
import InformationCard from "../components/Cards/InformationCard.ts/InformationCard";
import NewEntityDialog from "../components/NewEntity/NewEntityDialog";
import { Categories } from "../enums/apiEnums";

const CategoryPage: React.FC = observer(() => {
  const { category } = useParams();

  const [entityFieldsConfig, setEntityFieldsConfig] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);

  const entities: Option[] =
    swapiStore.entities.find((item) => item.category === category)?.data || [];

  const templateEntity = entities.length > 0 ? entities[0] : null;

  useEffect(() => {
    if (openModal) {
      const fieldsConfig = templateEntity
        ? swapiStore.getEntityConfig(templateEntity)
        : {};
      setEntityFieldsConfig(fieldsConfig);
    }
  }, [openModal, templateEntity]);

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => {
    setOpenModal(false);
    setEntityFieldsConfig({});
  };

  const handleCreateEntity = () => {
    if (Object.keys(entityFieldsConfig).length > 0) {
      const newEntity: Option = { ...entityFieldsConfig, category: category! };
      swapiStore.addEntity(newEntity);
      setEntityFieldsConfig({});
      handleCloseModal();
    }
  };

  return (
    <Box sx={{ padding: "20px", color: "white" }}>
      <Title variant="h4">{category && capitalize(category)} Page</Title>

      {Object.values(Categories).includes(category as Categories) && (
        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: "20px" }}
          onClick={handleOpenModal}
        >
          Create New Entity
        </Button>
      )}

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
      <NewEntityDialog
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        entityFieldsConfig={entityFieldsConfig}
        setEntityFieldsConfig={setEntityFieldsConfig}
        templateEntity={templateEntity}
        handleCreateEntity={handleCreateEntity}
      />
    </Box>
  );
});

export default CategoryPage;
