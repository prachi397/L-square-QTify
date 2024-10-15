import React from "react";
import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from "@mui/material";
import styles from "./Card.module.css";

const Card = ({data,type}) => {
  return (
    <MuiCard className={styles.card}>
      <div className={styles.cardMediaContainer}>
        <CardMedia
          component="img"
          image={data.image}
          alt={data.title}
          className={styles.cardImage}
        />
        <div className={styles.overlay}>
          <Typography variant="h6" component="div" className={styles.albumName}>
            {data.title}
          </Typography>
        </div>
      </div>
      <CardContent className={styles.cardContent}>
        <div className={styles.chipdata}>
        <Chip label={type === "songs" ? `${data.likes} Likes` : `${data.follows} Follows`} className={styles.chip} />
        </div>
        <Typography variant="h6" className={styles.subtitle}>
          {data.title}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
