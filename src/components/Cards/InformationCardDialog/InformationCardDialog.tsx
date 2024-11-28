import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Typography, Box, Modal } from "@mui/material";
import { Option } from "../../../types/apiTypes";
import { swapiStore } from "../../../stores/SwapiStore";
import { appStore } from "../../../stores/AppStore";
import InfoUrlsSection from "../InfoUrlsSection";
import NoDataCategory from "../../EmptyStates/NoDataCategory";
import { styles } from "./styles";
import InfoTable from "../InfoTable/InfoTable";

interface InformationCardDialogProps {
  selectedOption: Option | null;
}

const InformationCardDialog: React.FC<InformationCardDialogProps> = ({
  selectedOption,
}) => {
  const [fetchedEntity, setFetchedEntity] = useState<Option | null>(null);

  const handleUrlClick = async (url: string, label: string) => {
    appStore.setLoading(true);
    const entity = await swapiStore.fetchEntity(url);
    setFetchedEntity(entity);
    appStore.setLoading(false);
  };

  const entityToDisplay = fetchedEntity || selectedOption;
  const openingCrawl = swapiStore.getEntityOpenCrawl(entityToDisplay);

  return (
    <Modal
      open={swapiStore.openModal}
      onClose={() => swapiStore.setOpenModal(false)}
    >
      <Box sx={styles.modalBox}>
        {entityToDisplay ? (
          <>
            <Typography variant="h4" sx={styles.title}>
              {entityToDisplay.name || entityToDisplay.title}
            </Typography>
            {openingCrawl && (
              <Typography sx={styles.openingCrawl}>{openingCrawl}</Typography>
            )}
            <InfoTable entityToDisplay={entityToDisplay} />
            <InfoUrlsSection
              entityToDisplay={entityToDisplay}
              handleUrlClick={handleUrlClick}
            />
          </>
        ) : (
          <NoDataCategory text="No data Available" />
        )}
      </Box>
    </Modal>
  );
};

export default observer(InformationCardDialog);
