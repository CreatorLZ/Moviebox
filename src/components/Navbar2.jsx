import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
// import { Spinner } from "./Header";

const Container = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 15px 30px;
  color: #ffffff;
  height: 70px;
  width: 100%;
  z-index: 150;
  position: fixed;
  top: 0;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);

  @media only screen and (max-width: 768px) {
    padding: 10px 15px;
    height: 60px;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
  font-weight: bold;
  z-index: 1;
  flex-shrink: 0;

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 8px;
    object-fit: cover;
  }

  h4 {
    margin: 0;
    font-weight: 700;
    color: #fff;
  }

  @media only screen and (max-width: 768px) {
    font-size: 20px;

    img {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
  }

  @media only screen and (max-width: 420px) {
    h4 {
      display: none;
    }
  }
`;

const Search = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  position: relative;

  @media only screen and (max-width: 768px) {
    margin: 0 15px;
  }

  @media only screen and (max-width: 420px) {
    margin: 0 10px;
  }
`;

const Searchbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 12px 16px;
  width: 100%;
  max-width: 600px;
  border-radius: 25px;
  background: ${({ isFocused }) =>
    isFocused ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.1)"};
  border: 2px solid
    ${({ isFocused }) =>
      isFocused ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)"};
  transition: all 0.3s ease;

  input {
    border: none;
    background: transparent;
    color: #ffffff;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    outline: none;

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
      font-size: 16px;
      font-weight: 400;
    }
  }

  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 10px 14px;

    input {
      font-size: 14px;

      &::placeholder {
        font-size: 14px;
      }
    }
  }

  @media only screen and (max-width: 420px) {
    padding: 8px 12px;

    input {
      font-size: 13px;

      &::placeholder {
        font-size: 13px;
      }
    }
  }
`;

const Auth = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;

  p {
    margin: 0;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 20px;
    transition: all 0.3s ease;
    font-weight: 500;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }
  }

  @media only screen and (max-width: 768px) {
    gap: 10px;

    p:first-child {
      display: none;
    }
  }
`;

const MenuButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }

  img {
    width: 20px;
    height: 20px;
  }

  p {
    margin: 0;
    font-weight: 500;
  }

  @media only screen and (max-width: 420px) {
    padding: 6px 12px;

    p {
      display: none;
    }
  }
`;

const Searchresults = styled.div`
  position: absolute;
  top: ${({ searchInput }) => (searchInput ? "calc(100% + 10px)" : "-300px")};
  left: 0;
  right: 0;
  max-width: 600px;
  margin: 0 auto;
  max-height: 400px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  z-index: 100;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 10px 0;
  }

  li {
    padding: 12px 20px;
    background: transparent;
    margin: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 15px;
    font-weight: 500;
    color: #333;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(218, 47, 47, 0.1);
      transform: translateX(5px);
    }

    img {
      width: 50px;
      height: 75px;
      border-radius: 8px;
      object-fit: cover;
    }
  }

  @media only screen and (max-width: 768px) {
    left: 15px;
    right: 15px;
    max-width: none;
  }

  @media only screen and (max-width: 420px) {
    top: ${({ searchInput }) => (searchInput ? "calc(100% + 5px)" : "-300px")};
    left: 10px;
    right: 10px;

    li {
      padding: 10px 15px;
      gap: 10px;
      font-size: 14px;

      img {
        width: 40px;
        height: 60px;
      }
    }
  }
`;

const Menu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #da2f2f 0%, #b71c1c 100%);
  z-index: 200;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  overflow-y: auto;
`;

const Menuwrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  color: white;

  @media only screen and (max-width: 768px) {
    padding: 20px;
  }

  @media only screen and (max-width: 420px) {
    padding: 15px;
  }
`;

const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  @media only screen and (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const MenuLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }

  h3 {
    margin: 0;
    font-weight: 700;
    font-size: 24px;
  }

  @media only screen and (max-width: 420px) {
    h3 {
      font-size: 20px;
    }
  }
`;

const CloseButton = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const MenuContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const MenuSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  backdrop-filter: blur(10px);

  @media only screen and (max-width: 420px) {
    padding: 20px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  img {
    width: 28px;
    height: 28px;
  }

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    flex: 1;
  }

  .arrow {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  }

  @media only screen and (max-width: 420px) {
    h3 {
      font-size: 18px;
    }
  }
`;

const SectionItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;

  li {
    padding: 12px 20px;
    margin: 5px 0;
    cursor: pointer;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 400;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateX(10px);
    }
  }

  @media only screen and (max-width: 420px) {
    li {
      padding: 10px 15px;
      font-size: 15px;
    }
  }
`;

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
  min-height: 400px;

  width: 100%;
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

const Navbar2 = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Dropdown statess
  const [dropdowns, setDropdowns] = useState({
    movies: true,
    celebs: true,
    tvshows: true,
    watch: true,
    community: true,
  });

  const searchMovies = () => {
    if (searchInput.trim()) {
      setIsLoading(true);
      axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: apiKey,
            language: "en-US",
            query: searchInput,
            page: 1,
          },
        })
        .then((response) => {
          setSearchResults(response.data.results.slice(0, 10)); // Limit to 10 results
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error searching for movies:", error);
          setIsLoading(false);
        });
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchMovies();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchInput]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    setIsSearchEmpty(!inputValue.trim());
  };

  const clearSearchInput = () => {
    setSearchInput("");
    setIsSearchEmpty(true);
    setSearchResults([]);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "visible";
  };

  const toggleDropdown = (section) => {
    setDropdowns((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const menuSections = [
    {
      key: "movies",
      icon: "/images/movieswhite.png",
      title: "Movies",
      items: [
        "Upcoming Movies",
        "Top 20 Movies",
        "Trending Movies",
        "Browse Movies by Genre",
        "Editors Picks",
      ],
    },
    {
      key: "celebs",
      icon: "/images/celeb.png",
      title: "Celebs",
      items: ["Most Popular Actors", "Surprise Surprise", "People Favorite"],
    },
    {
      key: "tvshows",
      icon: "/images/tvhshow.png",
      title: "TV Shows",
      items: [
        "Whats Streaming",
        "Top 20 TV Shows",
        "Trending TV Shows",
        "Browse TV Shows by Genre",
        "Editors Picks",
      ],
    },
    {
      key: "watch",
      icon: "/images/play2.png",
      title: "Watch",
      items: ["What to Watch", "Surprise Surprise", "Editors Picks"],
    },
    {
      key: "community",
      icon: "/images/earth.png",
      title: "Community",
      items: ["Help Center", "Conditions Of Use", "Privacy Policy"],
    },
  ];

  return (
    <Container style={{ zIndex: 150 }}>
      <Logo>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src="/images/tv.png" alt="Movielogo" />
          <h4>MovieBox</h4>
        </Link>
      </Logo>

      <Search>
        <Searchbox isFocused={isFocused}>
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchInput}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          {isSearchEmpty ? (
            <img src="/images/Search.png" alt="search" />
          ) : (
            <img
              onClick={clearSearchInput}
              src="/images/cancel2.png"
              alt="clear"
            />
          )}
        </Searchbox>

        <Searchresults searchInput={searchInput && !isSearchEmpty}>
          {isLoading ? (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <Spinner />
            </div>
          ) : (
            <ul>
              {searchResults.map((movie) => (
                <Link
                  key={movie.id}
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/movies/${movie.id}`}
                  onClick={() => {
                    setSearchInput("");
                    setIsSearchEmpty(true);
                    setSearchResults([]);
                  }}
                >
                  <li>
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
                          : "/images/no-image.png"
                      }
                      alt={movie.title}
                    />
                    <span>{movie.title}</span>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </Searchresults>
      </Search>

      <Auth>
        <p>Sign in</p>
        <MenuButton onClick={toggleMenu}>
          <img src="/images/Menu.png" alt="menu" />
          <p>Menu</p>
        </MenuButton>
      </Auth>

      <Menu isOpen={isMenuOpen}>
        <Menuwrapper>
          <MenuHeader>
            <MenuLogo>
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
                onClick={toggleMenu}
              >
                <img src="/images/tv.png" alt="Movielogo" />
                <h3>MovieBox</h3>
              </Link>
            </MenuLogo>
            <CloseButton onClick={toggleMenu}>
              <img src="/images/cancel2.png" alt="close" />
            </CloseButton>
          </MenuHeader>

          <MenuContent>
            {menuSections.map((section) => (
              <MenuSection key={section.key}>
                <SectionHeader
                  isOpen={dropdowns[section.key]}
                  onClick={() => toggleDropdown(section.key)}
                >
                  <img src={section.icon} alt={section.title} />
                  <h3>{section.title}</h3>
                  <img
                    className="arrow"
                    src={
                      dropdowns[section.key]
                        ? "/images/up.png"
                        : "/images/down.png"
                    }
                    alt="toggle"
                  />
                </SectionHeader>
                <SectionItems isOpen={dropdowns[section.key]}>
                  {section.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </SectionItems>
              </MenuSection>
            ))}
          </MenuContent>
        </Menuwrapper>
      </Menu>
    </Container>
  );
};

export default Navbar2;
