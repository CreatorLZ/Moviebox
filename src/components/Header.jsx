import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";


const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  transition: all 0.5s ease-in-out;
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
    transition: all 0.5s ease-in-out;
  }
`;

const Wrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 90%;
  background: transparent;
  transition: all 0.5s ease-in-out;
  float: left;
  @media only screen and (max-width: 420px) {
    height: 50%;
    overflow: scroll;
    margin-top: 0px;
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
  color: #f5f5f5;

  h1 {
    font-weight: 700;
    font-size: 48px;
    line-height: 56px;
    
  }
  p {
    font-size: 14px;
    font-weight: 700;
  }
  @media only screen and (max-width: 420px) {
    min-width: 100vw;
    margin-left: 0px;
    height: fit-content;
    padding: 5px 20px;
    h1{
      font-size: 24px;
    }
    p {
    font-size: 14px;
    font-weight: 700;
  }
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
    top: 90%;
    left: 225px;
    img{
      width: 20px;
      height: 20px;
 
    }

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
    top: 90%;
    img{
      width: 20px;
      height: 20px;
    }

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
        setCurrentMovieIndex(1);
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
      }, 7000); // 7000 milliseconds = 7 seconds

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
            <h5>
              {(() => {
                const overview = movies[currentMovieIndex].overview;
                const words = overview.split(' ');
                const maxWords = 55;

                if (words.length > maxWords) {
                  const truncatedOverview = words.slice(0, maxWords).join(' ');
                  return `${truncatedOverview} ...`;
                } else {
                  return overview;
                }
              })()}
            </h5>
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
          <Spinner />
        )}
      </Wrapper>
    </Container>
  );
};

export default Header;
