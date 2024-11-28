import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
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
  handleShowMore: any;
}

const InformationCard: React.FC<InformationCardProps> = ({
  entity,
  handleShowMore,
}) => {
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
            onClick={() => handleShowMore(entity)}
            sx={styles.button}
          >
            Show More
          </Button>
        </CardActions>
      </Card>
    </Item>
  );
};

export default InformationCard;
