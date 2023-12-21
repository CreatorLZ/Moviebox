import styled from "styled-components";

export const GridContainer = styled.div`
  display: flex;
`;
export const Card = styled.div`
  box-sizing: border-box;
  border: none;
  outline:none;
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
    width: 100%;
    height: 100%;
  }
`;

export const Like = styled.img`
  @media only screen and (max-width: 420px) {
    left: 100px;
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

export const Ratings = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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
    background-color:#ebdede ;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
      background-color:#da2f2f;
    }
    @media only screen and (max-width: 420px) {
    left: 110px;
  }
    img{
      object-fit: contain;
      width: 25px;
      height: 25px;
      
    }

`
export const Options = styled.div`
  width: 120px;
  height: fit-content;
  background-color: white;
  position: absolute;
  top: 50px;
  left: 140px;
  cursor: pointer;
  z-index: 10;
  border-radius:5px;
  padding: 10px;
  @media only screen and (max-width: 420px) {
    left: 30px;
  }
ul{
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
  li{
    display: flex;
    align-items: center;
    gap: 3px;
    border-bottom:1px solid black;
    padding: 5px;
    &:hover{
      transform: scale(0.9);
    }
    img{
      width: 20px;
      height: 20px;
    }
  }
}
`