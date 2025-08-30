import styled from "styled-components";

export const GridContainer = styled.div`
  display: flex;
`;

export const Card = styled.div`
  box-sizing: border-box;
  border: none;
  outline: none;
  width: 180px !important;
  height: auto;
  text-align: left;
  gap: 12px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 0 12px;

  &:hover {
    /* transform: translateY(-8px); */
    /* box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15); */
  }

  :focus {
    outline: none;
    border: none;
  }

  .poster-container {
    position: relative;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    background: #000;
    aspect-ratio: 2/3;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease, filter 0.3s ease;
  }

  .hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 12px;
  }

  .play-button {
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0.8);
    transition: transform 0.2s ease;

    &::after {
      content: "";
      width: 0;
      height: 0;
      border-left: 20px solid #333;
      border-top: 12px solid transparent;
      border-bottom: 12px solid transparent;
      margin-left: 4px;
    }
  }

  &:hover .hover-overlay {
    opacity: 1;
  }

  &:hover .play-button {
    transform: scale(1);
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media only screen and (max-width: 768px) {
    width: 150px !important;
    margin: 0 10px;

    .play-button {
      width: 50px;
      height: 50px;

      &::after {
        border-left: 16px solid #333;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
      }
    }
  }

  @media only screen and (max-width: 420px) {
    width: 130px !important;
    margin: 0 16px;

    .play-button {
      width: 45px;
      height: 45px;

      &::after {
        border-left: 14px solid #333;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
      }
    }
  }

  @media only screen and (max-width: 385px) {
    width: 120px !important;
    margin: 0 5px;
  }

  .skeleton-wrapper {
    width: 100%;
    aspect-ratio: 2/3;
    border-radius: 12px;
    overflow: hidden;
  }
`;

export const Like = styled.img`
  @media only screen and (max-width: 420px) {
    left: 100px;
  }
`;

export const Card2 = styled.div`
  display: flex;
  width: 100%;
  padding-top: 12px;
  font-size: 12px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.3;

  p {
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 420px) {
    font-size: 10px;
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
  width: 100%;
  padding-top: 8px;
  font-size: 12px;
  font-weight: 600;

  div {
    display: flex;
    align-items: center;
    gap: 4px;

    p {
      margin: 0;
      color: #374151;
    }
  }

  @media only screen and (max-width: 420px) {
    font-size: 10px;
  }
`;

export const Dots = styled.div`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  z-index: 15;
  outline: none;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease, background-color 0.2s ease;

  ${Card}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: #be123c;
  }

  img {
    object-fit: contain;
    width: 16px;
    height: 16px;
    filter: contrast(0.8);
  }

  &:hover img {
    filter: brightness(0) invert(1);
  }
`;

export const Options = styled.div`
  width: 140px;
  height: fit-content;
  background-color: white;
  position: absolute;
  top: 50px;
  right: 12px;
  cursor: pointer;
  z-index: 20;
  border-radius: 8px;
  padding: 8px 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e7eb;

  @media only screen and (max-width: 420px) {
    right: 8px;
    width: 120px;
  }

  ul {
    font-size: 10px;
    display: flex;
    flex-direction: column;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      transition: background-color 0.2s ease;
      border-bottom: none;

      &:hover {
        background-color: #f3f4f6;
        transform: none;
      }

      &:last-child {
        border-bottom: none;
      }

      img {
        width: 16px;
        height: 16px;
        object-fit: contain;
      }

      p {
        margin: 0;
        font-weight: 500;
        color: #374151;
      }
    }
  }
`;
