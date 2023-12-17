import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Spinner2 from "./Spinner2";
import "animate.css/animate.min.css";

const Container = styled.div`
  width: 100%;
  padding: 10px 50px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  transition: 650ms;
  z-index: 5;
  Link {
    text-decoration: none;
    p {
      text-decoration: none;
    }
  }
  @media only screen and (max-width: 420px) {
    padding: 10px;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
  font-weight: normal;
  img {
    margin: 20px;
    border-radius: 50%;
    object-fit: cover;
  }
  @media only screen and (max-width: 420px) {
    img {
      margin: 5px;
    }
    h4 {
      display: none;
    }
  }
`;
const Logo2 = styled.div`
  font-size: 27px;
  display: flex;
  align-items: center;
  font-weight: normal;
  margin: 5px;
  img {
    border-radius: 50%;
    object-fit: cover;
  }
  @media only screen and (max-width: 420px) {
    display: none;
    img {
      margin: 5px;
    }
    h4 {
      display: flex;
    }
  }
`;

const Search = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  border: none;
  color: #ffffff;
  background: transparent;
  border-radius: 10px;
  input {
    border: none;
    background: transparent;
    color: #ffffff;
    width: 70%;
    font-size: 16px;
    font-weight: 400;
    outline: none;
    ::placeholder {
      color: #da2f2f;
      font-size: 16px;
      font-weight: 400;
    }
    :focus {
      border: none;
      outline: none;
    }
  }
  @media only screen and (max-width: 420px) {
    width: 80%;
    input {
      font-size: 12px;
      width: 90%;
      font-weight: 300;
    }
  }
`;
const Searchbox = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  font-size: 30px;
  width: 60%;
  border: 2px solid #ffffff;
  border-radius: 10px;
  background: rgba(128, 128, 128, 0.5);
  color: #ffffff;
  img {
    object-fit: contain;
  }
  @media only screen and (max-width: 420px) {
    width: 90%;
  }
`;
const Auth = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  gap: 20px;
  float: right;

  p:first-child {
    cursor: pointer;
    &:hover {
      padding: 5px 0px;
      border-radius: 5px;
      color: whitesmoke;
      background-color: rgba(146, 142, 142, 0.2);
    }
  }

  @media only screen and (max-width: 420px) {
    p {
      display: none;
    }
  }
`;
const Div = styled.div`
  width: fit-content;
  padding: 3px;
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: rgba(124, 122, 122, 0.2);
  }
`;
const Menu = styled.div`
  position: fixed;
  top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  z-index: 50;
  box-sizing: border-box;
  right: 0;
  transition: 650ms;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  background: #da2f2f;
  @media only screen and (max-width: 420px) {
    position: fixed;
    height: 100vh;
    width: 70%;
    z-index: 20;
    overflow: scroll;
    right: ${({ isOpen }) => (isOpen ? "0" : "100%")}; 
    top: 0;
  }
`;
const Overlay = styled.div`
position: fixed;
top: 0;
left: ${({isOpen}) => (isOpen ? '0' : '-100%')};
width: 30%;
height: 100%;
z-index: 10;
display: none;
background-color: rgba(0, 0, 0, 0.1);
transition: 650ms;
backdrop-filter: blur(2px);
@media only screen and (max-width: 420px) {
   display: flex;
   z-index: 10;
  }
`;
const Menuwrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px 170px;
  transition: 650ms;
  @media only screen and (max-width: 420px) {
    padding: 10px;
  }
`;
const Closemenu = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 50%;
  background: #da2f2f;
  background: #db4e4e;

  &:hover {
    background: #e96d8a;
  }
  cursor: pointer;
  img {
    width: 25px;
    height: 25px;
  }
`;

const Menubody = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  @media only screen and (max-width: 420px) {
    flex-direction: column;
    padding: 10px;
  }
`;
const Searchresults = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${({ searchInput }) => (searchInput ? "83px" : "-200px")};
  left: 442px;
  width: 528px;
  min-height: 50px;
  max-height: 200px;
  background-color: whitesmoke;
  border-radius: 3px;
  overflow: scroll;
  overflow-x: hidden;
  transition: top 0.5s ease-in-out;
  /* Customize scrollbar */
  &::-webkit-scrollbar {
    width: 10px; /* Width of the scrollbar */
  }

  /* Customize scrollbar track */
  &::-webkit-scrollbar-track {
    background: transparent; /* Background color of the scrollbar track */
  }

  /* Customize scrollbar thumb */
  &::-webkit-scrollbar-thumb {
    background: #888; /* Color of the scrollbar thumb */
    border-radius: 10px; /* Rounded corners of the scrollbar thumb */
  }

  ul {
    list-style: none;
    color: black;
    text-decoration: none !important;
  }
  li {
    padding: 10px;
    background: #f8e7eb;
    margin-bottom: 3px;
    cursor: pointer;
    text-decoration: none !important;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 400;
    img {
      width: 100px;
      height: 100px;
    }
  }

  @media only screen and (max-width: 420px) {
    top: ${({ searchInput }) => (searchInput ? "68px" : "-200px")};
    left: 81px;
    width: 211px;
  }
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 420px) {
    align-items: start;
    justify-content: flex-end;
    
  }
`;
const Topitem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
  }
  @media only screen and (max-width: 420px) {
    cursor: pointer;
    display: none;
  }
`;
const Topitem2 = styled.div`
  display: none;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px ;
  img {
    width: 20px;
    height: 20px;
    object-fit: cover;
  }
  @media only screen and (max-width: 420px) {
    cursor: pointer;
    display: flex;
    img {
      width: 25px;
      height: 25px;
      object-fit: cover;
    }
  }
`;
const Topbody = styled.div`
  display: flex;
  flex-direction: column;
  ul {
    list-style: none;
    padding: 20px;
    li {
      font-size: 18px;
      padding: 10px;
      cursor: pointer;
      &:hover {
        transform: scale(0.98);
      }
    }
    @media only screen and (max-width: 420px) {
      ${Topitem} {
        cursor: pointer;
      }
    }
  }
`;

const Ul1 = styled.ul`
  display: none;
  list-style: none;
  padding: 20px;
  li {
    font-size: 18px;
    padding: 10px;
    cursor: pointer;
    &:hover {
      transform: scale(0.98);
    }
  }
  @media only screen and (max-width: 420px) {
    display: flex;
    flex-direction: column;
    ${Topitem} {
      cursor: pointer;
    }
  }
`;
const Ul2 = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 20px;
  li {
    font-size: 18px;
    padding: 10px;
    cursor: pointer;
    &:hover {
      transform: scale(0.98);
    }
  }
  @media only screen and (max-width: 420px) {
    display: none;
    flex-direction: column;
    ${Topitem} {
      cursor: pointer;
    }
  }
`;
const Navbar = () => {
  const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
  const apiUrl = "https://api.themoviedb.org/3/movie/popular";
  const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";

  const [searchInput, setSearchInput] = useState(""); // State variable for user input
  const [searchResults, setSearchResults] = useState([]); // State variable for search results
  const [isLoading, setIsLoading] = useState(false); // State variable for loading state
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false);
  const [isCelebsDropdownOpen, setIsCelebsDropdownOpen] = useState(false);
  const [isTvShowsDropdownOpen, setIsTvShowsDropdownOpen] = useState(false);
  const [isWatchDropdownOpen, setIsWatchDropdownOpen] = useState(false);
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);

  const searchMovies = () => {
    if (searchInput) {
      setIsLoading(true);
      axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: apiKey,
            language: "en-US",
            query: searchInput, // Use the user's search input as the query
            page: 1,
          },
        })
        .then((response) => {
          // Set the search results
          setSearchResults(response.data.results);
          setIsLoading(false);
          console.log(response.data.results);
        })
        .catch((error) => {
          console.error("Error searching for movies:", error);
        });
    } else {
      // Clear the search results if the search input is empty
      setSearchResults([]);
    }
  };
  // Use useEffect to trigger the movie search when the searchInput changes
  useEffect(() => {
    searchMovies();
  }, [searchInput]);
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    setIsSearchEmpty(!inputValue.trim());
  };

  const clearSearchInput = () => {
    setSearchInput("");
    setIsSearchEmpty(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'visible' : 'hidden';

  };

  return (
    <Container>
      <Logo>
        <Link to="/">
          <img src="/images/tv.png" alt="Movielogo" />
        </Link>
        <h4>MovieBox</h4>
      </Logo>
      <Search>
        <Searchbox>
          <input
            type="text"
            placeholder="What do you want to watch?"
            value={searchInput}
            onChange={handleInputChange}
          />
          {isSearchEmpty ? (
            <img src="/images/Search.png" alt="search" />
          ) : (
            <img
              onClick={clearSearchInput}
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
              src="/images/cancel2.png"
              alt="cancel"
            />
          )}
        </Searchbox>
      </Search>
      <Auth>
        <p>Sign in</p>
        <Div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <img src="/images/Menu.png" alt="menu" onClick={toggleMenu} />
          <p>Menu</p>
        </Div>
      </Auth>

      {searchInput && (
        <Searchresults searchInput={searchInput}>
          {isLoading ? (
            <Spinner2 />
          ) : (
            <ul>
              {searchResults.map((movie) => (
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/movies/${movie.id}`}
                >
                  <li
                    style={{ textDecoration: "none", color: "black" }}
                    key={movie.id}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    {movie.title}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </Searchresults>
      )}
      <Menu isOpen={isMenuOpen}>
        <Menuwrapper>
          <Top>
            <Logo2 style={{ gap: "1px" }}>
              <Link
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  gap: "3px",
                }}
                to="/"
              >
                <img src="/images/tv.png" alt="Movielogo" />
                <h3 style={{ color: "Whitesmoke", fontWeight: "700" }}>
                  MovieBox
                </h3>
              </Link>
            </Logo2>
            <Closemenu onClick={toggleMenu}>
              <img src="/images/cancel2.png" alt="cancel" />
            </Closemenu>
          </Top>
          <Menubody>
            <Topbody>
              <Topitem>
                <img src="/images/movieswhite.png" alt="projector" />
                <h2>Movies</h2>
              </Topitem>
              <Topitem2
                onClick={() => setIsMoviesDropdownOpen(!isMoviesDropdownOpen)}
              >
                <img src="/images/movieswhite.png" alt="projector" />
                <h3>Movies</h3>
              </Topitem2>
              <Ul2>
                <li>Upcoming Movies</li>
                <li>Top 20 Movies</li>
                <li>Trending Movies</li>
                <li>Browse Movies by Genre</li>
                <li>Editors Picks</li>
              </Ul2>
              <Ul1 style={{ display: isMoviesDropdownOpen ? "block" : "none" }}>
                <li>Upcoming Movies</li>
                <li>Top 20 Movies</li>
                <li>Trending Movies</li>
                <li>Browse Movies by Genre</li>
                <li>Editors Picks</li>
              </Ul1>
              <Topitem>
                <img src="/images/celeb.png" alt="play" />
                <h2>Calebs</h2>
              </Topitem>
              <Topitem2 onClick={() => setIsCelebsDropdownOpen(!isCelebsDropdownOpen)}>
                <img src="/images/celeb.png" alt="celeb" />
                <h3>Celebs</h3>
              </Topitem2>
              <Ul1 style={{ display: isCelebsDropdownOpen ? "block" : "none" }}>
                <li>Most Popular Actors</li>
                <li>Suprise Suprise</li>
                <li>People Favorite</li>
              </Ul1>
              <Ul2>
                <li>Most Popular Actors</li>
                <li>Suprise Suprise</li>
                <li>People Favorite</li>
              </Ul2>
            </Topbody>
            <Topbody>
              <Topitem>
                <img src="/images/tvhshow.png" alt="show" />
                <h2>TV Shows</h2>
              </Topitem>
              <Topitem2
                onClick={() => setIsTvShowsDropdownOpen(!isTvShowsDropdownOpen)}
              >
                <img src="/images/tvhshow.png" alt="projector" />
                <h3>TV Shows</h3>
              </Topitem2>
              <Ul2>
                <li>Whats Streaming</li>
                <li>Top 20 TV Shows</li>
                <li>Trending TV Shows</li>
                <li>Browse TV Shows by Genre</li>
                <li>Editors Picks</li>
              </Ul2>
              <Ul1
                style={{ display: isTvShowsDropdownOpen ? "block" : "none" }}
              >
                <li>Whats Streaming</li>
                <li>Top 20 TV Shows</li>
                <li>Trending TV Shows</li>
                <li>Browse TV Shows by Genre</li>
                <li>Editors Picks</li>
              </Ul1>
            </Topbody>
            <Topbody>
              <Topitem>
                <img src="/images/play2.png" alt="play" />
                <h2>Watch</h2>
              </Topitem>
              <Topitem2
                onClick={() => setIsWatchDropdownOpen(!isWatchDropdownOpen)}
              >
                <img src="/images/play2.png" alt="projector" />
                <h3>Watch</h3>
              </Topitem2>
              <Ul2>
                <li>What to Watch</li>
                <li>Suprise Suprise</li>
                <li>Editors Picks</li>
              </Ul2>
              <Ul1 style={{ display: isWatchDropdownOpen ? "block" : "none" }}>
                <li>What to Watch</li>
                <li>Suprise Suprise</li>
                <li>Editors Picks</li>
              </Ul1>
              <Topitem>
                <img src="/images/earth.png" alt="play" />
                <h2>Community</h2>
              </Topitem>
              <Topitem2
                onClick={() =>
                  setIsCommunityDropdownOpen(!isCommunityDropdownOpen)
                }
              >
                <img src="/images/earth.png" alt="projector" />
                <h3>Community</h3>
              </Topitem2>
              <Ul2>
                <li>Help Center</li>
                <li>Conditions Of Use</li>
                <li>Privacy Policy</li>
              </Ul2>
              <Ul1
                style={{ display: isCommunityDropdownOpen ? "block" : "none" }}
              >
                <li>Help Center</li>
                <li>Conditions Of Use</li>
                <li>Privacy Policy</li>
              </Ul1>
            </Topbody>
          </Menubody>
        </Menuwrapper>
        <Overlay isOpen={isMenuOpen} onClick={toggleMenu} />
      </Menu>
    </Container>
  );
};

export default Navbar;
