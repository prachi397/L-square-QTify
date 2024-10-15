import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Tab, Tabs } from "@mui/material";
import Card from "./Card";
import axios from "axios";
import styles from "./Section.module.css";
import Carousel from "../Carousel/Carousel";

const Section = ({ sectionType }) => {
  const [cardData, setCardData] = useState([]); //for top albums
  const [newAlbumData, setNewAlbumData] = useState([]);
  const [originalSongData, setOriginalSongData] = useState([]);
  const [songData, setSongData] = useState([]);
  // const [isCollapsed, setIsCollapsed] = useState(sectionType === "newAlbums");
  const [isCollapsed, setIsCollapsed] = useState(false);
  
   const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    if (sectionType === "albums") {
      fetchTopAlbums();
    } else if (sectionType === "newAlbums") {
      fetchNewAlbums();
    } else if (sectionType === "songs") {
      fetchSongs();
      fetchGenres();
    }
  }, [sectionType]);

  // Fetch Top Albums
  async function fetchTopAlbums() {
    const url = "https://qtify-backend-labs.crio.do/albums/top";
    try {
      const resp = await axios.get(url);
      setCardData(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  // Fetch New Albums
  async function fetchNewAlbums() {
    const url = "https://qtify-backend-labs.crio.do/albums/new";
    try {
      const resp = await axios.get(url);
      setNewAlbumData(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  // Fetch Songs
  async function fetchSongs() {
    const url = "https://qtify-backend-labs.crio.do/songs";
    try {
      const resp = await axios.get(url);
      setOriginalSongData(resp.data);
      setSongData(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  // Fetch Genres
  async function fetchGenres() {
    try {
      const resp = await axios.get("https://qtify-backend-labs.crio.do/genres");
      if (resp.data && Array.isArray(resp.data.data)) {
        setGenres([{ key: "All", label: "All" }, ...resp.data.data]);
      } else {
        console.log("Invalid response format", resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Filter Songs by Genre
  const filterSongsByGenre = (genre) => {
    setSelectedGenre(genre);
    if (genre === "All") {
      setSongData(originalSongData);
    } else {
      const filteredSongs = originalSongData.filter(
        (song) => song.genre.key === genre
      );
      setSongData(filteredSongs);
    }
  };

  // Toggle Collapse button
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
          {sectionType === "albums"
            ? "Top Albums"
            : sectionType === "newAlbums"
            ? "New Albums"
            : "Songs"}
        </Typography>

        {sectionType === "albums" || sectionType === "newAlbums" ? (
          <Button
            variant="text"
            style={{
              color: "green",
              fontWeight: "bold",
              textTransform: "none",
            }}
            onClick={handleCollapse}
          >
            {!isCollapsed ? "Show All" : "Collapse"}
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
              <Tab
                key={genre.key}
                label={genre.label}
                value={genre.key}
                className={`${styles.tab} ${
                  selectedGenre === genre.key ? styles.selectedTab : ""
                }`}
              />
            ))}
          </Tabs>
        )}
      </Grid>

      {isCollapsed ? (
        <Carousel
          cardData={sectionType === "albums" ? cardData : newAlbumData}
          type={sectionType === "albums" ? "album" : "newAlbum"}
        />
      ) : (
        <Grid container spacing={3} className={styles.gridContainer}>
          {(sectionType === "albums" ? cardData : newAlbumData).map((ele) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={ele.id}>
              <Card data={ele} type="album" />
            </Grid>
          ))}
        </Grid>
      )}

      {sectionType === "songs" && <Carousel cardData={songData} type="songs" />}
    </div>
  );
};

export default Section;
