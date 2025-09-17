import React, { useEffect, useState, lazy, Suspense } from "react";
import styled, { css, createGlobalStyle } from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { Spinner } from "../components/Header";
const YouTube = lazy(() => import("react-youtube"));

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  position: relative;
  overflow-x: hidden;
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${(props) =>
      props.bgImage ? `url(${props.bgImage})` : "none"};
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    filter: brightness(0.7);
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

const HeroSection = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  display: flex;
  align-items: center;
  padding: 0 60px;
  padding-top: 100px;

  @media (max-width: 768px) {
    /* MOBILE: Adjust height to be content-driven */
    min-height: auto;
    height: auto;
    padding: 120px 20px 40px 20px;
  }
`;

const HeroContent = styled.div`
  display: flex;
  gap: 40px;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 768px) {
    /* MOBILE: Stack poster and info vertically */
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 30px;
  }
`;

const PosterImage = styled.img`
  width: 250px;
  height: 375px; /* Maintain a good aspect ratio */
  border-radius: 8px;
  border: 4px solid white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  object-fit: cover;

  @media (max-width: 768px) {
    /* MOBILE: Make poster fluid but not too big */
    width: 65%;
    max-width: 250px;
    height: auto;
  }
`;

const MovieInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  @media (max-width: 768px) {
    /* MOBILE: Center align all text content */
    align-items: center;
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: bold;
  margin: 0 0 20px 0;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #ccc;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 15px;
  }
`;

const GenreList = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const GenreTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const InfoText = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: #f5f5f5;

  strong {
    color: #fff;
  }

  span {
    color: #ccc;
  }
`;

const Tagline = styled.p`
  margin: 20px 0;
  font-style: italic;
  color: #ccc;
  max-width: 500px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const WatchButton = styled.button`
  background: #da2f2f;
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 25px;
  font-size: 16px;
  width: fit-content;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s;

  &:hover {
    background: #a92424;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const Section = styled.section`
  padding: 60px;
  background-color: rgba(0, 0, 0, 0.6);

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: white;
`;

const Storyline = styled.div`
  max-width: 1000px;
  h3 {
    color: #f5f5f5;
    margin-bottom: 15px;
    font-size: 22px;
  }
`;

// MOBILE: New component for truncating text
const StorylineText = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #ddd;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${(props) => (props.isExpanded ? "999" : "4")};
  }
`;

// MOBILE: New component for "See more" button
const SeeMoreButton = styled.button`
  display: none; /* Hidden by default on desktop */
  @media (max-width: 768px) {
    display: inline-block;
    background: none;
    border: none;
    color: #da2f2f;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
    font-size: 16px;
    padding: 5px 0;
  }
`;

/* --- All other styled components (MediaGrid, CastGrid, etc.) remain the same --- */

const MediaGrid = styled.div`
  display: flex; /* Changed from grid to flex */
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
`;

const TrailerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px; /* Limits the maximum width of the trailer */
  margin: 20px 0 20px 0; /* Centers the container and adds vertical margin */
  aspect-ratio: 16/9; /* A more standard video aspect ratio */
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 12px; /* Slightly more rounded corners */
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); /* Adds some depth */
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02); /* Subtle zoom effect on hover */
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.4),
      transparent
    ); /* Gradient overlay */
    z-index: 1;
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  &.playing::before {
    display: none;
  }
`;

const PlayButton = styled.div`
  position: absolute;
  z-index: 2;
  width: 80px;
  height: 80px;
  background: #da2f2f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #a92424;
    transform: scale(1.1);
  }

  svg {
    width: 32px;
    height: 32px;
    color: white;
    margin-left: 4px;
  }
`;

const TrailerTitle = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 2;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PosterGrid = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 20px;
  margin-top: 30px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 20px;

  /* --- CUSTOM SCROLLBAR --- */

  /* Works on Firefox */
  scrollbar-width: thin;
  scrollbar-color: #555 transparent;

  /* Works on Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    height: 8px; /* Height of the horizontal scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* Makes the track invisible */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #777;
  }
`;

const SimilarMoviePoster = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0; /* A shorthand for top, right, bottom, left: 0 */
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 8px; /* Match the card's border-radius */
`;

const PlayButtonIcon = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.8);
  transition: transform 0.2s ease;

  /* This pseudo-element creates the triangle "play" shape */
  &::after {
    content: "";
    width: 0;
    height: 0;
    border-left: 18px solid #333;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    margin-left: 4px;
  }
`;

const PosterCard2 = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden; /* Clips the image during the zoom effect */
  cursor: pointer;
  transition: transform 0.3s ease;

  flex: 0 0 180px;
  height: 280px;

  &:hover {
    transform: scale(1.05);
  }

  /* When hovering the card, show the overlay */
  &:hover ${HoverOverlay} {
    opacity: 1;
  }

  /* When hovering the card, scale up the play button */
  &:hover ${PlayButtonIcon} {
    transform: scale(1);
  }
`;

const PosterCard = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s;

  /* Added a base width for flex items */
  flex: 0 0 180px;

  &:hover {
    transform: scale(1.05);
  }
`;

const CastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 30px;

  /* --- Mobile-Specific Styles --- */
  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding: 10px 0 20px 0; // Add padding for aesthetics and scrollbar space

    /* --- CUSTOM SCROLLBAR (for mobile) --- */
    scrollbar-width: thin;
    scrollbar-color: #555 transparent;

    &::-webkit-scrollbar {
      height: 8px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #555;
      border-radius: 10px;
    }
  }
`;

const CastCard = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  background-color: #222; /* Fallback color */
  aspect-ratio: 2 / 3; /* Gives cards a consistent portrait shape */

  &:hover {
    transform: scale(1.05);
  }

  /* Set a fixed width for mobile flexbox layout */
  @media (max-width: 768px) {
    flex: 0 0 140px; /* Do not grow, do not shrink, fixed width of 140px */
  }
`;

const CastImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CastInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 10%, transparent);
`;

const CastName = styled.h4`
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 2px 0;
  color: #fff;
`;

const CastRole = styled.p`
  font-size: 13px;
  color: #ccc;
  margin: 0;
`;

const MoviePage = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");
  const [videos, setVideos] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const [posters, setPosters] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State for "See more"

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const baseUrl = "https://api.themoviedb.org/3";

  // ... (useEffect fetching logic remains the same) ...

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        // Fetch movie details, credits, and videos in one call
        const movieResponse = await axios.get(`${baseUrl}/movie/${id}`, {
          params: {
            api_key: apiKey,
            append_to_response: "credits,videos",
          },
        });
        setMovieData(movieResponse.data);
        console.log(movieResponse.data);

        const directors = movieResponse.data.credits.crew.filter(
          (member) => member.job === "Director"
        );
        setDirector(directors.map((d) => d.name).join(", "));

        setCast(movieResponse.data.credits.cast);
        setVideos(
          movieResponse.data.videos.results.filter((v) => v.type === "Trailer")
        );

        // Fetch images
        const imagesResponse = await axios.get(
          `${baseUrl}/movie/${id}/images`,
          {
            params: { api_key: apiKey },
          }
        );
        setBackdrops(imagesResponse.data.backdrops);
        setPosters(imagesResponse.data.posters);

        // Fetch similar movies
        const similarResponse = await axios.get(
          `${baseUrl}/movie/${id}/similar`,
          {
            params: { api_key: apiKey },
          }
        );
        setSimilarMovies(similarResponse.data.results);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).getFullYear();
  };

  if (loading || !movieData) {
    return <Spinner />;
  }

  const mainTrailer = videos.length > 0 ? videos[0] : null;

  return (
    <Container
      bgImage={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
    >
      <GlobalStyle />
      <Navbar2 />
      <HeroSection>
        <HeroContent>
          <PosterImage
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt={movieData.title}
          />
          <MovieInfo>
            <Title>{movieData.title}</Title>
            <MetaInfo>
              <span>{formatDate(movieData.release_date)}</span>
              <span>•</span>
              <span>{formatRuntime(movieData.runtime)}</span>
            </MetaInfo>

            <GenreList>
              {movieData.genres.map((genre) => (
                <GenreTag key={genre.id}>{genre.name}</GenreTag>
              ))}
            </GenreList>

            <InfoText>
              <strong>Director(s):</strong> <span>{director}</span>
            </InfoText>
            <InfoText>
              <strong>Language(s):</strong>{" "}
              <span>
                {movieData.spoken_languages
                  .map((l) => l.english_name)
                  .join(", ")}
              </span>
            </InfoText>
            <InfoText>
              <strong>Status:</strong> <span>{movieData.status}</span>
            </InfoText>

            {movieData.tagline && <Tagline>"{movieData.tagline}"</Tagline>}

            <a href="#trailer-section" style={{ textDecoration: "none" }}>
              <WatchButton>Watch Trailer</WatchButton>
            </a>
          </MovieInfo>
        </HeroContent>
      </HeroSection>

      <Section>
        <Storyline>
          <h3>Storyline</h3>
          <StorylineText isExpanded={isExpanded}>
            {movieData.overview}
          </StorylineText>
          {/* Only show button if text is long enough to be clamped */}
          {movieData.overview.length > 250 && (
            <SeeMoreButton onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "See less" : "See more"}
            </SeeMoreButton>
          )}
        </Storyline>
      </Section>

      {mainTrailer && (
        <Section id="trailer-section">
          <SectionTitle>Trailers and video extras</SectionTitle>
          <MediaGrid>
            <TrailerContainer className={isTrailerPlaying ? "playing" : ""}>
              {!isTrailerPlaying ? (
                <>
                  <img
                    src={`https://img.youtube.com/vi/${mainTrailer.key}/maxresdefault.jpg`}
                    alt="Trailer thumbnail"
                  />
                  <PlayButton onClick={() => setIsTrailerPlaying(true)}>
                    <PlayIcon />
                  </PlayButton>
                  <TrailerTitle>{mainTrailer.name}</TrailerTitle>
                </>
              ) : (
                <Suspense fallback={<div>Loading player...</div>}>
                  <YouTube
                    videoId={mainTrailer.key}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        modestbranding: 1,
                        rel: 0,
                      },
                    }}
                    onReady={(event) => event.target.playVideo()}
                    onError={() => setIsTrailerPlaying(false)}
                  />
                </Suspense>
              )}
            </TrailerContainer>
          </MediaGrid>
        </Section>
      )}

      {/* --- Other sections (Cast, Similar, etc.) --- */}
      <Section>
        <SectionTitle>Cast</SectionTitle>
        <CastGrid>
          {cast.slice(0, 12).map((person, index) => (
            <CastCard key={person.id}>
              <CastImage
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                    : "https://via.placeholder.com/150x225"
                }
                alt={person.name}
              />
              <CastInfo>
                <CastName>{person.name}</CastName>
                <CastRole>{person.character}</CastRole>
              </CastInfo>
            </CastCard>
          ))}
        </CastGrid>
      </Section>

      {similarMovies.length > 0 && (
        <Section>
          <SectionTitle>Similar Movies</SectionTitle>
          <PosterGrid>
            {similarMovies.slice(0, 10).map((movie, index) => (
              <PosterCard2
                key={movie.id}
                onClick={() => (window.location.href = `/movies/${movie.id}`)}
              >
                <SimilarMoviePoster
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
                <HoverOverlay>
                  <PlayButtonIcon />
                </HoverOverlay>
              </PosterCard2>
            ))}
          </PosterGrid>
        </Section>
      )}

      {backdrops.length > 0 && (
        <Section>
          <SectionTitle>Backdrops</SectionTitle>
          <PosterGrid>
            {backdrops.slice(0, 6).map((image, index) => (
              <PosterCard
                key={index}
                src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                alt={`Backdrop ${index + 1}`}
                style={{ height: "200px" }}
              />
            ))}
          </PosterGrid>
        </Section>
      )}

      {posters.length > 0 && (
        <Section>
          <SectionTitle>Posters</SectionTitle>
          <PosterGrid>
            {posters.slice(0, 8).map((image, index) => (
              <PosterCard
                key={index}
                src={`https://image.tmdb.org/t/p/w300${image.file_path}`}
                alt={`Poster ${index + 1}`}
              />
            ))}
          </PosterGrid>
        </Section>
      )}

      <Footer />
    </Container>
  );
};

export default MoviePage;
