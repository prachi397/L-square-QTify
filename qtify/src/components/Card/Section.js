import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Tab, Tabs } from "@mui/material";
import Card from "./Card";
import axios from "axios";
import styles from "./Section.module.css";
import Carousel from "../Carousel/Carousel";

const Section = ({ sectionType }) => {
  const [cardData, setCardData] = useState([]); 
  const [originalSongData, setOriginalSongData] = useState([]); 
  const [songData, setSongData] = useState([]); 
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    if (sectionType === "albums") {
      fetchAlbums();
    } else if (sectionType === "songs") {
      fetchSongs(); 
      fetchGenres(); 
    }
  }, [sectionType]);

  async function fetchAlbums() {
    const url = "https://qtify-backend-labs.crio.do/albums/top";
    try {
      let resp = await axios.get(url);
      setCardData(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchSongs() {
    const url = "https://qtify-backend-labs.crio.do/songs";
    try {
      let resp = await axios.get(url);
      setOriginalSongData(resp.data); 
      setSongData(resp.data); 
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchGenres() {
    try {
      let resp = await axios.get("https://qtify-backend-labs.crio.do/genres");
      if (resp.data && Array.isArray(resp.data.data)) {
        setGenres([{ key: "All", label: "All" }, ...resp.data.data]);
      } else {
        console.log("Invalid response format", resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const filterSongsByGenre = (genre) => {
    setSelectedGenre(genre);
    if (genre === "All") {
      setSongData(originalSongData); 
    } else {
      const filteredSongs = originalSongData.filter((song) => song.genre.key === genre); 
      setSongData(filteredSongs); 
    }
  };

  function handleCollapse() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className={styles.section}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={styles.header}
      >
        <Typography variant="h5" color="white">
          {sectionType === "albums" ? "Top Albums" : "Songs"}
        </Typography>

        {sectionType === "albums" ? (
          <Button
            variant="text"
            style={{ color: "green", fontWeight: "bold", textTransform: "none" }}
            onClick={handleCollapse}
          >
            {isCollapsed ? "Show All" : "Collapse"}
          </Button>
        ) : (
          <Tabs
            value={selectedGenre}
            onChange={(event, newValue) => filterSongsByGenre(newValue)}
            aria-label="songs-genre-tabs"
            indicatorColor="primary"
            textColor="primary"
          >
            {genres.map((genre) => (
              <Tab key={genre.key} label={genre.label} value={genre.key} 
              className={`${styles.tab} ${selectedGenre === genre.key ? styles.selectedTab : ''}`} />
            ))}
          </Tabs>
        )}
      </Grid>

      {isCollapsed ? (
        <>
          {sectionType === "albums" && <Carousel cardData={cardData} type="album" />}
        </>
      ) : (
        <>
          {sectionType === "albums" && (
            <Grid container spacing={3} className={styles.gridContainer}>
              {cardData.map((ele) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={ele.id}>
                  <Card data={ele} type="album" />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
      {sectionType === "songs" && <Carousel cardData={songData} type="songs" />}
    </div>
  );
};

export default Section;
