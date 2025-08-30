import React, { useEffect, useState, lazy, Suspense } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
const YouTube = lazy(() => import("react-youtube"));

const Container = styled.div`
  min-height: 100vh;
  color: white;
  /* background-color: #000; */
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
    padding: 0 20px;
    height: 80vh;
  }
`;

const HeroContent = styled.div`
  display: flex;
  gap: 40px;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
  }
`;

const PosterImage = styled.img`
  width: 250px;
  height: 320px;
  border-radius: 8px;
  border: white 5px solid;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    width: 250px;
    height: 375px;
  }
`;

const MovieInfo = styled.div`
  display: flex;
  /* flex: 1; */
  width: 100vw;
  flex-direction: row;
`;

const MovieInfoRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieInfoRowInner1 = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const MovieInfoRowInner2 = styled.div`
  margin-top: 200px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 0 20px 0;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  color: #ccc;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }
`;

const GenreList = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const GenreTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Director = styled.p`
  margin: 10px 0;
  font-size: 16px;
  color: #f5f5f5;

  span {
    color: #f5f5f5;
    font-weight: 500;
  }
`;

const Languages = styled.p`
  margin: 10px 0;
  font-size: 16px;
  color: #f5f5f5;

  span {
    color: #f5f5f5;
  }
`;

const WatchButton = styled.button`
  background: #da2f2f;
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 25px;
  font-size: 10px;
  width: fit-content;
  font-weight: 600;
  cursor: pointer;
  margin: 20px 0;
  transition: background 0.3s;

  &:hover {
    background: #a92424;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const WorthWatching = styled.div`
  margin: 10px 0;

  h3 {
    color: #f5f5f5;
    margin-bottom: 10px;
    font-size: 16px;
  }

  p {
    color: #f5f5f5;
    line-height: 1.6;
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

const StorylineSection = styled(Section)`
  background-color: rgba(0, 0, 0, 0.6);
`;

const Storyline = styled.div`
  max-width: 1200px;

  h3 {
    color: #f5f5f5;
    margin-bottom: 20px;
    font-size: 24px;
  }

  p {
    font-size: 18px;
    line-height: 1.8;
    color: #f5f5f5;
  }
`;

const MediaGrid = styled.div`
  display: flex; /* Changed from grid to flex */
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
`;

const MediaCard = styled.div`
  background: #222;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

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
    background-color: #555; /* A sleek dark grey */
    border-radius: 10px;
    border: 2px solid transparent; /* Creates a "padding" effect */
    background-clip: content-box; /* Ensures border is not covered by the background */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #777; /* Slightly lighter on hover for better UX */
  }
`;

const PosterCard = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const CastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 30px;
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const CastCard = styled.div`
  text-align: center;
`;

const CastImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const CastName = styled.h4`
  font-size: 16px;
  margin-bottom: 5px;
`;

const CastRole = styled.p`
  font-size: 14px;
  color: #ccc;
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

const Duration = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 2;
`;

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ThumbsUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const MoviePage = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");
  const [writer, setWriter] = useState("");
  const [videos, setVideos] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const [posters, setPosters] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

  const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
  const baseUrl = "https://api.themoviedb.org/3";

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
        // const writers = response.data.crew.filter(
        //   (member) => member.department === "Writing"
        // );
        // setWriter(writers.map((w) => w.name).join(", "));

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
    return `${hours}h ${mins}min`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).getFullYear();
  };

  if (loading || !movieData) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>Loading...</div>
      </Container>
    );
  }

  const mainTrailer = videos.length > 0 ? videos[0] : null;

  return (
    <Container
      bgImage={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
    >
      <Navbar2 />
      <HeroSection
      // bgImage={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
      >
        <HeroContent>
          <PosterImage
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt={movieData.title}
          />
          <MovieInfo>
            <MovieInfoRowInner1>
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

              <Director>
                <strong>Director(s):</strong> <span>{director}</span>
              </Director>

              {/* <Writer>
                <strong>Writer(s):</strong> <span>{writer}</span>
              </Writer> */}

              <Languages>
                <strong>Language(s):</strong>{" "}
                <span>
                  {movieData.spoken_languages
                    .map((l) => l.english_name)
                    .join(", ")}
                </span>
              </Languages>

              <Languages>
                <strong>Status:</strong> <span>{movieData.status}</span>
              </Languages>

              {/* <Subtitles>
                <strong>Subtitles:</strong> <a>Show all</a>
              </Subtitles> */}
              {movieData.tagline ? (
                <WorthWatching>
                  <h3>Worth watching because</h3>
                  <p>{movieData.tagline}</p>
                </WorthWatching>
              ) : (
                ""
              )}
              <WatchButton>Watch Trailer</WatchButton>
            </MovieInfoRowInner1>

            {/* <MovieInfoRowInner2>
           
              <WatchButton>Watch Trailer</WatchButton>
            </MovieInfoRowInner2> */}
          </MovieInfo>
        </HeroContent>
      </HeroSection>

      <StorylineSection>
        <Storyline>
          <h3>Storyline</h3>
          <p>{movieData.overview}</p>
        </Storyline>
      </StorylineSection>

      {mainTrailer && (
        <Section>
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
                        controls: 1,
                        enablejsapi: 1,
                        origin: window.location.origin,
                        showinfo: 1,
                      },
                    }}
                    onReady={(event) => {
                      // The player is ready
                      event.target.playVideo();
                    }}
                    onError={(error) => {
                      console.error("YouTube Player Error:", error);
                      setIsTrailerPlaying(false);
                    }}
                  />
                </Suspense>
              )}
            </TrailerContainer>
          </MediaGrid>
        </Section>
      )}

      <Section>
        <SectionTitle>Cast</SectionTitle>
        <CastGrid>
          {cast.slice(0, 12).map((person, index) => (
            <CastCard key={person.id}>
              <CastImage
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                    : "https://via.placeholder.com/120"
                }
                alt={person.name}
              />
              <CastName>{person.name}</CastName>
              <CastRole>{person.character}</CastRole>
            </CastCard>
          ))}
        </CastGrid>
      </Section>

      {similarMovies.length > 0 && (
        <Section>
          <SectionTitle>Similar Movies</SectionTitle>
          <PosterGrid>
            {similarMovies.slice(0, 10).map((movie, index) => (
              <PosterCard
                key={movie.id}
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                onClick={() => (window.location.href = `/movies/${movie.id}`)}
              />
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
