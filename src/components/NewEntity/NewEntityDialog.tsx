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

interface NewEntityDialogProps {
  openModal: boolean;
  handleCloseModal: () => void;
  entityFieldsConfig: any;
  setEntityFieldsConfig: React.Dispatch<React.SetStateAction<any>>;
  templateEntity: any;
  handleCreateEntity: () => void;
}

const NewEntityDialog: React.FC<NewEntityDialogProps> = ({
  openModal,
  handleCloseModal,
  entityFieldsConfig,
  setEntityFieldsConfig,
  templateEntity,
  handleCreateEntity,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEntityFieldsConfig((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
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
        Create New Entity
      </DialogTitle>
      <DialogContent sx={{ flex: 1, marginBottom: "20px" }}>
        <InputsRenderer
          templateEntity={templateEntity}
          entityFieldsConfig={entityFieldsConfig}
          handleInputChange={handleInputChange}
        />
      </DialogContent>
      <NewEntityActions
        handleCloseModal={handleCloseModal}
        handleCreateEntity={handleCreateEntity}
      />
    </Dialog>
  );
};

export default NewEntityDialog;
