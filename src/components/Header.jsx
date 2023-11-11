import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import axios from "axios";
import Spinner2 from "./Spinner2";
import { Link } from "react-router-dom";


const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  transition: all 0.5s ease-in-out;
  /* overflow-x: hidden; */
  display: flex;
  flex-direction: column;
  background-image: url(${(props) => props.backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  @media only screen and (max-width: 420px) {
    background-size: 100% 100%;
    background-position: center;
    min-height: 60vh;
  }
`;

const Wrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 90%;
  background: transparent;
  float: left;
  @media only screen and (max-width: 420px) {
    min-height: 50%;
    max-height: 50%;
    overflow: scroll;
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
  margin-left: 60px;
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
    padding: 5px 20px;
  }
`;

const Button1 = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 15px 10px;
  border: 1px solid white;
  border-radius: 5px;
  &&:hover {
    background-color: rgba(192, 192, 192, 0.2);
  }
  img {
    width: 30px;
    height: 30px;
  }
  @media only screen and (max-width: 420px) {
    display: none;
  }
`;
const Button2 = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 15px 10px;
  border: 1px solid white;
  border-radius: 5px;

  &&:hover {
    background-color: rgba(192, 192, 192, 0.2);
  }
  img {
    width: 30px;
    height: 30px;
  }
  @media only screen and (max-width: 420px) {
    display: none;
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
  :hover {
    color: #ebe1e1;
    cursor: pointer;
    transform: scale(0.9);
  }
`;

const Header = () => {
  const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
  const apiUrl = "https://api.themoviedb.org/3/movie/popular";
  const imageBaseUrl = "https://image.tmdb.org/t/p/w1280"; // Base URL for movie poster images
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
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
        // Get top-rated movies
        const topRatedMovies = response.data.results;
        setMovies(topRatedMovies);

        // Initially, display the first movie
        setCurrentMovieIndex(0);
      })
      .catch((error) => {
        console.error("Error fetching top-rated movies:", error);
      });
  }, []);

  useEffect(() => {
    if (currentMovieIndex >= 0 && currentMovieIndex < movies.length) {
      const currentMovie = movies[currentMovieIndex];
      axios
        .get(`https://api.themoviedb.org/3/movie/${currentMovie.id}`, {
          params: {
            api_key: apiKey,
            language: "en-US",
          },
        })
        .then((movieResponse) => {
          // Update the backgroundImage based on the currentMovie's backdrop_path
          setBackgroundImage(
            `${imageBaseUrl}${movieResponse.data.backdrop_path}`
          );
        })
        .catch((error) => {
          console.error("Error fetching movie details:", error);
        });
      // Start the interval for changing movies
      const intervalId = setInterval(() => {
        nextMovie();
      }, 8000); // 8000 milliseconds = 8 seconds

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [currentMovieIndex, movies, apiKey, imageBaseUrl]);

  const previousMovie = () => {
    if (currentMovieIndex > 0) {
      setCurrentMovieIndex(currentMovieIndex - 1);
    }
  };

  const nextMovie = () => {
    if (currentMovieIndex < movies.length - 1) {
      setCurrentMovieIndex(currentMovieIndex + 1);
    }
  };

  return (
    <Container style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Navbar />
      <Wrapper>
        {movies.length > 0 ? (
          <Description>
            <h1>{movies[currentMovieIndex].original_title}</h1>
            <Ratings>
              <img
                src="./images/imdb.png"
                alt="imdb"
                style={{ marginRight: "10px" }}
              />
              <p style={{ marginRight: "30px" }}>
                {movies[currentMovieIndex].vote_average} / 10.0
              </p>
              <img
                src="./images/tomato.png"
                alt="tomato"
                style={{ marginRight: "10px" }}
              />
              <p>97%</p>
            </Ratings>
            <p>{movies[currentMovieIndex].overview}</p>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/movies/${movies[currentMovieIndex].id}`}
            >
              <Button>
                <img src="./images/play.png" alt="Button" />
                <p>WATCH TRAILER</p>
              </Button>
            </Link>

            <Button1 onClick={previousMovie}>
              <img src="/images/back.png" alt="prev_movie" />
            </Button1>
            <Button2 onClick={nextMovie}>
              <img src="/images/forward.png" alt="next-movie" />
            </Button2>
          </Description>
        ) : (
          // loading message while data is being fetched
          <Spinner2 />
        )}
      </Wrapper>
    </Container>
  );
};

export default Header;
