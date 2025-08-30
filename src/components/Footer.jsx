import React from "react";
import styled from "styled-components";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const FooterContainer = styled.footer`
  background-color: #161616;
  color: #a0a0a0;
  font-family: Arial, sans-serif;
  padding: 40px 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  font-size: 14px;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  flex: 1;
  min-width: 150px;

  h4 {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    text-transform: uppercase;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 8px;
    a {
      color: #a0a0a0;
      text-decoration: none;
      transition: color 0.3s ease;
      &:hover {
        color: #fff;
      }
    }
  }

  p {
    margin: 0;
  }
`;

const FollowUs = styled(Section)`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  h4 {
    margin-bottom: 15px;
  }
`;

const Social = styled.div`
  display: flex;
  gap: 15px;
  font-size: 20px;

  a {
    color: #fff;
    transition: transform 0.3s ease, color 0.3s ease;
    &:hover {
      color: #da2f2f;
      transform: scale(1.1);
    }
  }
`;

const BottomSection = styled.div`
  border-top: 1px solid #333;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 20px;
  a {
    color: #a0a0a0;
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover {
      color: #fff;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <TopSection>
        <Section>
          <h4>ABOUT US</h4>
          <ul>
            <li>
              <a href="#">About us</a>
            </li>

            <li>
              <a href="#">Contact us</a>
            </li>
          </ul>
        </Section>

        <Section>
          <h4>HELP</h4>
          <ul>
            <li>
              <a href="#">FAQ(no faq just kidding 💀)</a>
            </li>
            <li>
              <a href="#">Uno reverse. help us😌</a>
            </li>
            <li>
              <a href="#">Do you want a feature?</a>
            </li>
          </ul>
        </Section>

        <FollowUs>
          <h4>FOLLOW US ON</h4>
          <Social>
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
          </Social>
        </FollowUs>
      </TopSection>

      <BottomSection>
        <p>© 2025 Moviebox – All rights reserved</p>
        <Links>
          <a href="#">Terms and Conditions of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
        </Links>
      </BottomSection>
    </FooterContainer>
  );
};

export default Footer;
