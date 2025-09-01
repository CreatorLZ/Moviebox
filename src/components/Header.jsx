import React, { useCallback, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar2 from "./Navbar2";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #111;
`;

export const SpinnerWheel = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #4a4a4a;
  border-top-color: #be123c;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const Spinner = () => (
  <SpinnerContainer>
    <SpinnerWheel />
  </SpinnerContainer>
);

// --- Styled Components ---

const fadeIn = css`
  opacity: 1;
  visibility: visible;
`;

const fadeOut = css`
  opacity: 0;
  visibility: hidden;
`;

const BackgroundLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.backgroundImage});
  transition: opacity 1s ease-in-out;
  ${(props) => (props.active ? fadeIn : fadeOut)};
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3));
    z-index: 1;
  }

  @media (max-width: 768px) {
    height: 90vh;
  }
`;

const Wrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 90%;
  background: transparent;
  z-index: 2;

  @media (max-width: 768px) {
    margin-top: 0;
    display: flex;
    align-items: flex-end; /* Align content to the bottom on mobile */
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 90%;
  max-width: 550px; /* Increased max-width for better text display */
  height: fit-content;
  padding: 180px 0;
  margin-left: 60px;
  color: white;
  z-index: 2;

  h1 {
    font-weight: 700;
    font-size: 48px;
    line-height: 1.1;
  }
  h5 {
    color: #f5f5f5;
    line-height: 1.5;
    font-weight: 400; /* Softer font-weight */
  }
  p {
    font-size: 14px;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 30px 20px;
    width: 100%;
    max-width: 100%;
    gap: 0.75rem;

    h1 {
      font-size: 32px;
    }
    h5 {
      font-size: 14px;
    }
  }
`;

const NavControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  gap: 1rem; /* Space between buttons */
  z-index: 5;

  @media (max-width: 768px) {
    display: none; /* Hide side controls on mobile */
  }
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const SliderDots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 5;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: ${(props) =>
    props.active ? "rgba(255,255,255,0.9)" : "transparent"};
  cursor: pointer;
  padding: 0;
  transition: background-color 0.3s ease;

  @media (min-width: 769px) {
    width: 12px;
    height: 12px;
  }
`;

const Ratings = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  color: white;
  gap: 30px; /* Use gap for spacing */
`;

const RatingItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TrailerLink = styled(Link)`
  padding: 12px 16px;
  background: #be123c;
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 8px;
  border-radius: 8px;
  text-decoration: none;
  color: white;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    background: #9f1239;
    transform: scale(1.05);
  }
`;

const truncateText = (text, wordLimit) => {
  if (!text) {
    return "";
  }
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const Header = () => {
  const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
  const apiUrl = "https://api.themoviedb.org/3/movie/popular";
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [backgrounds, setBackgrounds] = useState(["", ""]);
  const [activeBgIndex, setActiveBgIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch movies on initial render
  useEffect(() => {
    axios
      .get(apiUrl, {
        params: { api_key: apiKey, language: "en-US", page: 1 },
      })
      .then((response) => {
        const topMovies = response.data.results.slice(0, 10);
        setMovies(topMovies);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
        setIsLoading(false);
      });
  }, [apiKey, apiUrl]);

  // Handle background image preloading and transition
  useEffect(() => {
    if (movies.length === 0) return;

    const currentMovie = movies[currentMovieIndex];
    const newImageUrl = `${imageBaseUrl}${currentMovie.backdrop_path}`;
    const nextBgIndex = 1 - activeBgIndex;

    const img = new Image();
    img.src = newImageUrl;
    img.onload = () => {
      // Image is loaded, now update the state to switch background smoothly
      setBackgrounds((prev) => {
        const newBackgrounds = [...prev];
        newBackgrounds[nextBgIndex] = newImageUrl;
        return newBackgrounds;
      });
      setActiveBgIndex(nextBgIndex);
    };
  }, [currentMovieIndex, movies, imageBaseUrl]);

  // Handle automatic slide transition
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMovieIndex(
        (prevIndex) => (prevIndex + 1) % (movies.length || 1)
      );
    }, 7000);

    return () => clearInterval(intervalId);
  }, [movies.length]);

  const goToNext = useCallback(() => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % (movies.length || 1));
  }, [movies.length]);

  const goToPrevious = useCallback(() => {
    const newIndex = (currentMovieIndex - 1 + movies.length) % movies.length;
    setCurrentMovieIndex(newIndex);
  }, [currentMovieIndex, movies.length]);

  const goToIndex = useCallback((index) => {
    setCurrentMovieIndex(index);
  }, []);

  const currentMovie = movies[currentMovieIndex];

  if (isLoading) {
    return <Spinner />;
  }

  const truncatedOverview = currentMovie
    ? truncateText(currentMovie.overview, 30)
    : "";

  return (
    <Container>
      <BackgroundLayer
        backgroundImage={backgrounds[0]}
        active={activeBgIndex === 0}
      />
      <BackgroundLayer
        backgroundImage={backgrounds[1]}
        active={activeBgIndex === 1}
      />
      <Navbar2 />
      <Wrapper>
        {currentMovie ? (
          <Description>
            <h1>{currentMovie.original_title}</h1>
            <Ratings>
              <RatingItem>
                <img src="/images/imdb.png" alt="imdb" />
                <p>{currentMovie.vote_average.toFixed(1)} / 10</p>
              </RatingItem>
              <RatingItem>
                <img src="/images/tomato.png" alt="tomato" />
                <p>97%</p>
              </RatingItem>
            </Ratings>
            <h5>{truncatedOverview}</h5>
            <TrailerLink to={`/movies/${currentMovie.id}`}>
              <img src="/images/play.png" alt="Play Trailer" />
              <p>WATCH TRAILER</p>
            </TrailerLink>
          </Description>
        ) : (
          !isLoading && <p>No movies found.</p>
        )}
      </Wrapper>

      <NavControls>
        <NavButton onClick={goToPrevious} aria-label="Previous movie">
          <img src="/images/back.png" alt="Previous" />
        </NavButton>
        <NavButton onClick={goToNext} aria-label="Next movie">
          <img src="/images/forward.png" alt="Next" />
        </NavButton>
      </NavControls>

      <SliderDots>
        {movies.map((_, index) => (
          <Dot
            key={index}
            active={index === currentMovieIndex}
            onClick={() => goToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </SliderDots>
    </Container>
  );
};

export default Header;
