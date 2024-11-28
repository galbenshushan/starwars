import React from "react";
import { DialogActions, Button } from "@mui/material";

interface NewEntityActionsProps {
  handleCloseModal: () => void;
  handleCreateEntity: () => void;
}

const NewEntityActions: React.FC<NewEntityActionsProps> = ({ handleCloseModal, handleCreateEntity }) => {
  return (
    <DialogActions sx={{ justifyContent: "flex-end" }}>
      <Button
        onClick={handleCloseModal}
        color="secondary"
        sx={{ color: "white" }}
      >
        Cancel
      </Button>
      <Button
        onClick={handleCreateEntity}
        color="primary"
        sx={{ color: "white" }}
      >
        Create
      </Button>
    </DialogActions>
  );
};

export default NewEntityActions;
