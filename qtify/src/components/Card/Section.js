import React, { useEffect, useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import Card from "./Card";
import axios from "axios";
import styles from "./Section.module.css";

const Section = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const url = "https://qtify-backend-labs.crio.do/albums/top";
    try {
      let resp = await axios.get(url);
      setCardData(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.section}>
      <Grid container justifyContent="space-between" alignItems="center" className={styles.header}>
        <Typography variant="h5" color="white">Top Albums</Typography>
        <Button variant="text" style={{ color: "green", fontWeight: "bold", textTransform:"none" }}>Collapse</Button>
      </Grid>

      <Grid container spacing={3} className={styles.gridContainer}>
        {cardData.length &&
          cardData.map((ele) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={ele.id}>
              <Card data={ele} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Section;
