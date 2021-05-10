import React from 'react';
import styled from 'styled-components';
import logo from './Logo-Icon-Black.svg';

export const Ettiket = () => {
  return (
    <Container>
      <Front>
        <Hero name="Ilchard Puttanesca" />
        <DescriptionContainer>
          <h2>#52837</h2>
          <h3>
            <span>Category: </span>
            <span>Pasta</span>
          </h3>
          <h3>
            <span>Area: </span>
            <span>Italy</span>
          </h3>
          <p>
            Cook the pasta following pack instructions. Heat the oil in a
            non-stick frying pan and cook the onion, garlic and chilli for 3-4
            mins to soften. Stir in the tomato purée and cook for 1 min, then
            add the pilchards with their sauce. Cook, breaking up the fish with
            a wooden spoon, then add the olives and continue to cook for a few
            more mins.
            <br />
            Drain the pasta and add to the pan with 2-3 tbsp of the cooking
            water. Toss everything together well, then divide between plates and
            serve, scattered with Parmesan.
          </p>
        </DescriptionContainer>
      </Front>
      <Back>
        <Hero name="Ilchard Puttanesca" />
      </Back>
    </Container>
  );
};

const Hero = ({ name }) => (
  <HeroContainer>
    <img src={logo} alt="logo" />
    <h1>Apollo Foods</h1>
    <h2>{name}</h2>
  </HeroContainer>
);

const HeroContainer = styled.section`
  grid-column: span 10;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 128px;
    height: 128px;
  }

  h1 {
    margin: 0;
    font-size: 36px;
  }

  h2 {
    font-size: 24px;
    padding: 8px 16px;
    margin: 16px 0 8px;
    background: linear-gradient(91.47deg, #fc8569 0%, #9b92d3 100%);
    border-radius: 50px;
    color: white;
  }
`;

const Container = styled.div`
  font-family: Blatant;
  font-weight: normal;

  position: fixed;
  top: 0;
  left: 0;
  width: 1000px;
  height: 1000px;
  background-color: var(--orange-50);

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 60px;
  padding: 400px 28px 0;
`;

const Front = styled.div`
  grid-column: span 3;
  /* width: 455px; */
  height: 430px;
  background-color: white;
  border-radius: 12px;

  display: grid;
  grid-template-columns: repeat(10, 1fr);
  column-gap: 12px;
  padding: 0 16px 24px;
`;

const Back = styled(Front)``;

const DescriptionContainer = styled.section`
  grid-column: 2 / span 8;
  background: white;
  border: 5px solid var(--orange-50);
  box-sizing: border-box;
  padding: 8px 4px;

  h3,
  h2,
  p {
    margin: 0;
  }
  p {
    margin-top: 8px;
    font-size: 0.8rem;
  }
`;
