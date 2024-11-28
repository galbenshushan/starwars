import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Backdrop,
  Fade,
} from "@mui/material";
import InputsRenderer from "./InputsRenderer";
import NewEntityActions from "./NewEntityActions";
import { swapiStore } from "../../stores/SwapiStore";

interface NewEntityDialogProps {
  entityFieldsConfig: any;
  templateEntity: any;
  handleCreateOrEditEntity: () => void;
}

const NewEntityDialog: React.FC<NewEntityDialogProps> = ({
  entityFieldsConfig,
  templateEntity,
  handleCreateOrEditEntity,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    swapiStore.setEntityFieldsConfig({ ...entityFieldsConfig, [name]: value });
  };

  return (
    <Dialog
      open={swapiStore.openEntityModal}
      onClose={swapiStore.resetAndCloseEntityModal}
      TransitionComponent={Fade}
      BackdropComponent={Backdrop}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#1e1e1e",
          maxWidth: "1000px",
          maxHeight: "80vh",
          padding: "40px",
          borderRadius: "8px",
          outline: "none",
        },
      }}
    >
      <DialogTitle sx={{ color: "white", textAlign: "center" }}>
        {swapiStore.selectedOption ? "Edit" : "Create"} New Entity
      </DialogTitle>
      <DialogContent sx={{ flex: 1, marginBottom: "20px" }}>
        <InputsRenderer
          templateEntity={templateEntity}
          entityFieldsConfig={entityFieldsConfig}
          handleInputChange={handleInputChange}
        />
      </DialogContent>
      <NewEntityActions handleCreateOrEditEntity={handleCreateOrEditEntity} />
    </Dialog>
  );
};

export default NewEntityDialog;
