import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { observer } from "mobx-react-lite"; // Import observer
import { swapiStore } from "../../../stores/SwapiStore";
import { Option } from "../../../types/apiTypes";
import { styles } from "./styles";

const Item = styled("div")(({ theme }) => ({
  flex: "1 1 calc(25% - 24px)",
  minWidth: "250px",
  minHeight: "300px",
  maxWidth: "calc(25% - 24px)",
  boxSizing: "border-box",
  marginBottom: "40px",
}));

interface InformationCardProps {
  entity: Option | null;
  handleNewOrEdit: (entity: Option) => void;
}

const InformationCard: React.FC<InformationCardProps> = observer(
  ({ entity, handleNewOrEdit }) => {
    if (!entity) return null;

    const fields = swapiStore.getDisplayFields(entity);

    return (
      <Item>
        <Card sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <Typography variant="h5" sx={styles.title}>
              {entity.name || entity.title}
            </Typography>

            {fields.map((field, index) => (
              <Typography key={index}>
                {field.label}: {field.value}
              </Typography>
            ))}
          </CardContent>
          <CardActions sx={styles.cardActions}>
            <Button
              variant="contained"
              onClick={() => {
                swapiStore.setSelectedOption(entity);
                swapiStore.setOpenShowMoreModal(true);
              }}
              sx={styles.button}
            >
              More
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleNewOrEdit(entity)}
              sx={styles.button}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => swapiStore.removeEntity(entity)}
              sx={styles.button}
            >
              Remove
            </Button>
          </CardActions>
        </Card>
      </Item>
    );
  }
);

export default InformationCard;
