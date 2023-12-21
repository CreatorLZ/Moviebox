import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow-x: hidden;
  background-color: whitesmoke;
  @media only screen and (max-width: 420px) {
    flex-direction: column;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  background: #f8e7eb;
  @media only screen and (max-width: 420px) {
    margin-left: 0px;
    padding: 0px;
    width: 100vw;
  }
`;

export const Promotion = styled.div`
  width: 170px;
  height: 200px;
  border-radius: 20px;
  border: 2px solid #be123c;
  background: #be123c1a;
  font-weight: 600;
  font-size: 15px;
  padding: 20px;
  gap: 10px;
  @media only screen and (max-width: 420px) {
    width: 100%;
    display: none;
  }
`;
export const Poster = styled.div`
  width: 70%;
  height: 80vh;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  @media only screen and (max-width: 420px) {
    height: 40vh;
    width: 100%;
    margin-bottom: 0px;
  }
`;

export const Moviedetails = styled.div`
  width: 744px;
  height: 100%;
  @media only screen and (max-width: 420px) {
    width: 100%;
  }
`;
export const Moviedetailsright = styled.div`
  width: 350px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  @media only screen and (max-width: 420px) {
    width: 100%;
    display: none;
  }
`;
export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 700;
  z-index: 10;
  margin-bottom: 10px;
  p {
    font-size: 16px;
    font-weight: 600;
  }
  @media only screen and (max-width: 420px) {
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    flex-wrap: wrap;
  }
`;
export const Actors = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px;
  gap: 5px;
  font-weight: 700;
  font-size: 23px;
  margin-bottom: 10px;
  @media only screen and (max-width: 420px) {
    width: 100%;
    font-weight: 700;
    font-size: 18px;
    flex-wrap: wrap;
    display: flex;
    overflow-x: scroll;
    padding: 20px;
  }
`;
export const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 700;
  font-size: 23px;
  margin-bottom: 10px;
  @media only screen and (max-width: 420px) {
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    flex-wrap: wrap;
    display: none;
  }
`;
export const Top2 = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 700;
  font-size: 23px;
  margin-bottom: 10px;
  padding: 5px 30px;
  @media only screen and (max-width: 420px) {
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    flex-wrap: wrap;
    padding: 0px;
  }
`;
export const Top3 = styled.div`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  gap: 5px;
  font-weight: 700;
  margin-bottom: 10px;
  padding: 5px 30px;
  @media only screen and (max-width: 420px) {
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    flex-wrap: wrap;
    padding: 0px;
    display: none;
  }
`;
export const Top4 = styled.div`
  display: none;
  /* align-items: center; */
  flex-direction: column;
  gap: 5px;
  font-weight: 700;
  margin-bottom: 10px;
  padding: 5px 30px;
  @media only screen and (max-width: 420px) {
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    flex-wrap: wrap;
    padding: 0px 10px;
    display: flex;
    margin-bottom: 0px;
  }
`;
export const Genrecard = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 5px;
  border-radius: 15px;
  border: 1px solid #be123c;
  color: #be123c;
  font-size: 15px;
  font-weight: 700;
  line-height: 23px;
  cursor: pointer;
  @media only screen and (max-width: 420px) {
    font-size: 12px;
    flex-wrap: wrap;
    padding: 3px;
  }
`;
export const Genrecard2 = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  flex-wrap: wrap;
  gap: 3px;
  @media only screen and (max-width: 420px) {
    display: none;
    gap: 3px;
  }
`;
export const Genrecard3 = styled.div`
  display: none;
  align-items: center;
  width: fit-content;
  gap: 3px;
  @media only screen and (max-width: 420px) {
    display: flex;
    gap: 3px;
  }
`;
export const Description = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
  width: 744px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  display: none;
  @media only screen and (max-width: 420px) {
    width: 100%;
    display: flex;
    text-align: left;
    width: 100%;
    font-size: 12px;
    line-height: 30px;
  }
`;
export const Description2 = styled.div`
  font-size: 17px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
  width: 744px;
  height: auto;
  gap: 20px;
  display: flex;
  flex-direction: column;
  span {
    color: #be123c;
  }
  @media only screen and (max-width: 420px) {
    width: 100%;
    margin-bottom: 20px;
    p {
      font-size: 16px;
    }
  }
`;
export const Descbottom = styled.div`
  width: 90%;
  border-radius: 10px;
  border: 1px solid gray;
  height: 50px;
  display: flex;
  margin-top: 20px;
  @media only screen and (max-width: 420px) {
    width: 300px;
    flex-direction: column;
    height: fit-content;
    display: none;
    p:first-child {
      width: 100%;
    }
  }
`;
export const Button1 = styled.div`
  width: 100%;
  padding: 20px;
  color: #ffffff;
  background: #be123c;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  cursor: pointer;
  gap: 5px;
  @media only screen and (max-width: 420px) {
    width: 80%;
    padding: 10px 20px;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 400;
  }
`;
export const Button2 = styled.div`
  background: #be123c1a;
  border: 1px solid #be123c;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  gap: 5px;
  @media only screen and (max-width: 420px) {
    width: 80%;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 400;
  }
`;
export const Ads = styled.div`
  width: 100%;
  height: 229px;
  position: relative;
  img {
    width: 100%;
  }
  margin-top: 20px;
  @media only screen and (max-width: 420px) {
    width: 80%;
  }
`;
export const Adbottom = styled.div`
  width: 100%;
  height: 42px;
  border-radius: 10px;
  position: absolute;
  bottom: 40px;
  background: #12121280;
  display: flex;
  align-items: center;
  color: #ffffff;
  cursor: pointer;
  gap: 5px;
  img {
    width: 23px;
    height: 23px;
  }
  font-size: 14px;
  @media only screen and (max-width: 420px) {
    bottom: 73px;
  }
`;
export const Omega = styled.div`
  padding: 10px 30px;
  @media only screen and (max-width: 420px) {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
`;
export const MovieImg = styled.img`
  display: flex;
  @media only screen and (max-width: 420px) {
    display: none;
  }
`;
export const MovieImg2 = styled.img`
  display: none;
  @media only screen and (max-width: 420px) {
    display: flex;
  }
`;
export const ProductionLogo = styled.img`
  width: 50px;
  height: auto;
  object-fit: cover;
`;

export const CastProfileDiv = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-position: center center;
  background-size: contain;

  /* object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden; */
  @media only screen and (max-width: 420px) {
    width: 120px;
    height: 120px;
  }
`;
export const CastProfile = styled.img`
  width: 100%;
  height: 100%;
  /* width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  overflow: hidden;
  display: block;
  @media only screen and (max-width: 420px) {
    width: 120px;
    height: 120px;
  } */
`;
export const CastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px; // gap between images
  overflow-x: auto;
  white-space: nowrap;
  @media only screen and (max-width: 420px) {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    div {
      flex-direction: column;
    }
  }
`;

export const Card = styled.div`
  /* box-sizing: border-box; */
  border: none;
  outline: none;
  width: 270px;
  height: 200px;
  text-align: left;
  gap: 16px;
  position: relative;
  :focus {
    outline: none;
    border: none;
  }
  img {
    width: 270px;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  @media only screen and (max-width: 420px) {
    width: 170px;
    height: 200px;
    img {
      width: 170px;
      height: 100%;
      object-fit: cover;
    }
    :focus {
      outline: none;
    }
  }
  @media only screen and (max-width: 385px) {
    width: 152px;
    height: 200px;
    img {
      width: 152px;
      height: 100%;
      object-fit: cover;
    }
    :focus {
      outline: none;
    }
  }
  .skeleton-wrapper {
    width: 270px;
    height: 100%;
    @media only screen and (max-width: 420px) {
      width: 160px;
    }
  }
`;
export const Card2 = styled.div`
  display: flex;
  width: 80%;

  padding-top: 8px;
  font-size: 18px;
  font-weight: 700;
  @media only screen and (max-width: 420px) {
    font-size: 12px;
  }
`;
export const Div1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  padding-top: 8px;
  font-size: 12px;
  font-weight: 400;
  @media only screen and (max-width: 420px) {
    width: 50%;
  }
`;
export const Dots = styled.div`
  width: 35px;
  height: 35px;
  position: absolute;
  object-fit: cover;
  top: 10px;
  left: 220px;
  cursor: pointer;
  z-index: 10;
  outline: none;
  background-color: #ebdede;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #da2f2f;
  }
  @media only screen and (max-width: 420px) {
    left: 110px;
  }
  img {
    object-fit: contain;
    width: 25px;
    height: 25px;
  }
`;
export const Options = styled.div`
  width: 120px;
  height: fit-content;
  background-color: white;
  position: absolute;
  top: 50px;
  left: 140px;
  cursor: pointer;
  z-index: 10;
  border-radius: 5px;
  padding: 10px;
  @media only screen and (max-width: 420px) {
    left: 30px;
  }
  ul {
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 5px;
    li {
      display: flex;
      align-items: center;
      gap: 3px;
      border-bottom: 1px solid black;
      padding: 5px;
      &:hover {
        transform: scale(0.9);
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
