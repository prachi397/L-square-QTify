import React from "react";
import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from "@mui/material";
import rect from "../../assets/Rectangle 2139.png";
import styles from "./Card.module.css";

const Card = (prop) => {
    console.log("prop geting", prop)
  return (
    <MuiCard className={styles.card}>
      <div className={styles.cardMediaContainer}>
        <CardMedia
          component="img"
          image={prop.data.image}
          alt={prop.data.title}
          className={styles.cardImage}
        />
        <div className={styles.overlay}>
          <Typography variant="h6" component="div" className={styles.albumName}>
            {prop.data.title}
          </Typography>
        </div>
      </div>
      <CardContent className={styles.cardContent}>
        <div className={styles.chipdata}>
        <Chip label={`${prop.data.follows} Follows`} className={styles.chip} />
        </div>
        <Typography variant="h6" className={styles.subtitle}>
          {prop.data.title}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
