import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import axios from "axios";
import Spinner2 from "./Spinner2";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  background-image: url(${(props) => props.backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
`;
const Wrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 90%;
  background: transparent;
  float: left;
  @media only screen and (max-width: 420px) {

    min-height: 50%;
    max-height: fit-content;
   
  }
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 30vw;
  max-width: 50vw;
  height: fit-content;
  padding: 30px 40px;
  margin-left: 40px;
  color: #ffffff;
  h1 {
    font-weight: 700;
    font-size: 48px;
    line-height: 56px;
  }
  p {
    font-size: 14px;
    font-weight: 500;
  }
  @media only screen and (max-width: 420px) {
    min-width: 100vw;
    margin-left: 0px;
    height: fit-content;
   
  }
`;
export const Ratings = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
`;
const Button = styled.div`
  padding: 12px 16px;
  background: #be123c;
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 8px;
  border-radius: 8px;
`;

const Header = () => {
  const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
  // const apiUrl = "https://api.themoviedb.org/3/movie/top_rated";
  const apiUrl = "https://api.themoviedb.org/3/movie/popular";
  const imageBaseUrl = "https://image.tmdb.org/t/p/w1280"; // Base URL for movie poster images

  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(""); // State variable for background image

  useEffect(() => {
    axios
      .get(apiUrl, {
        params: {
          api_key: apiKey,
          language: "en-US",
          page: 1,
        },
      })
      .then((response) => {
        // Get the first top-rated movie
        const topRatedMovies = response.data.results;

        // Generate a random index to select a random movie
        const randomIndex = Math.floor(Math.random() * topRatedMovies.length);
        const randomMovie = topRatedMovies[randomIndex];
        console.log(topRatedMovies);
        const firstMovie = topRatedMovies[0];

        // Fetch additional details for the first movie
        axios
          .get(`https://api.themoviedb.org/3/movie/${randomMovie.id}`, {
            params: {
              api_key: apiKey,
              language: "en-US",
            },
          })
          .then((movieResponse) => {
            setFeaturedMovie(movieResponse.data);

            // Set the background image URL
            setBackgroundImage(
              `${imageBaseUrl}${movieResponse.data.backdrop_path}`
            );
          })
          .catch((error) => {
            console.error("Error fetching movie details:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching top-rated movies:", error);
      });
  }, []);
  console.log(featuredMovie);

  return (
    <Container style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Navbar />
      <Wrapper>
        {featuredMovie ? (
          <Description>
            <h1>{featuredMovie.original_title}</h1>
            <Ratings>
              <img
                src="./images/imdb.png"
                alt="imdb"
                style={{ marginRight: "10px" }}
              />
              <p style={{ marginRight: "30px" }}>
                {featuredMovie.vote_average} / 100
              </p>
              <img
                src="./images/tomato.png"
                alt="tomato"
                style={{ marginRight: "10px" }}
              />
              <p>97%</p>
            </Ratings>
            <p>{featuredMovie.overview}</p>

            <Button>
              <img src="./images/play.png" alt="Button" />
              <p>WATCH TRAILER</p>
            </Button>
          </Description>
        ) : (
          //  loading message while data is being fetched
          <Spinner2 />
        )}
      </Wrapper>
    </Container>
  );
};

export default Header;
