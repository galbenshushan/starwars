import React from "react";
import { DialogActions, Button } from "@mui/material";
import { swapiStore } from "../../stores/SwapiStore";

interface NewEntityActionsProps {
  handleCreateOrEditEntity: () => void;
}

const NewEntityActions: React.FC<NewEntityActionsProps> = ({
  handleCreateOrEditEntity,
}) => {
  return (
    <DialogActions sx={{ justifyContent: "flex-end" }}>
      <Button
        onClick={swapiStore.resetAndCloseEntityModal}
        color="secondary"
        sx={{ color: "white" }}
      >
        Cancel
      </Button>
      <Button
        onClick={handleCreateOrEditEntity}
        color="primary"
        sx={{ color: "white" }}
      >
        {swapiStore.selectedOption ? "Edit" : "Create"}
      </Button>
    </DialogActions>
  );
};

export default NewEntityActions;
