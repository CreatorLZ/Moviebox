import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Spinner2 from "./Spinner2";

const Container = styled.div`
  width: 100%;
  padding: 10px 50px;
  color: #ffffff;
  /* position: fixed;
  top: 0; */
  display: flex;
  justify-content: space-between;
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
    border: 50%;
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
  gap: 20px;
  float: right;
  @media only screen and (max-width: 420px) {
    p {
      display: none;
    }
  }
`;
const Searchresults = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 85px;
  left: 480px;
  width: 500px;
  min-height: 50px;
  max-height: 200px;
  background-color: whitesmoke;
  border-radius: 10px;
  overflow: scroll;

  ul {
    list-style: none;
    color: black;
    text-decoration: none !important;
  }
  li {
    padding: 10px;
    background: #f8e7eb;
    margin-bottom: 10px;
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
    top: 70px;
    left: 90px;
    width: 250px;
  }
`;

const Navbar = () => {
  const apiKey = "14526ed9b5bfe3871ae714ee0a0c7f07";
  const apiUrl = "https://api.themoviedb.org/3/movie/popular";
  const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";

  const [searchInput, setSearchInput] = useState(""); // State variable for user input
  const [searchResults, setSearchResults] = useState([]); // State variable for search results
  const [isLoading, setIsLoading] = useState(false); // State variable for loading state
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
  return (
    <Container>
      <Logo>
        <Link to="/">
          <img src="./images/tv.png" alt="Movielogo" />
        </Link>
        <h4>MovieBox</h4>
      </Logo>
      <Search>
        <Searchbox>
          <input
            type="text"
            placeholder="What do you want to watch?"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <img src="./images/Search.png" alt="search" />
        </Searchbox>
      </Search>
      <Auth>
        <p>Sign in</p>
        <img src="./images/Menu.png" alt="menu" />
      </Auth>
      
        
      {searchInput && (
        <Searchresults>
          {isLoading ? <img src="/images/1495 (1).gif" alt="loader" /> :
          <ul>
            {searchResults.map((movie) => (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/movie/${movie.id}`}
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
          </ul> }
        </Searchresults>
      )}
    </Container>
  );
};

export default Navbar;
