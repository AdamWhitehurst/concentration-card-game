import React from "react";
import styled from "styled-components";
import Nav from "./Nav";
import Table from "./Table";
import Title from "./Title";
import Subtitle from "./Subtitle";
import Button from "./Button";
import withDeck from "./Deck";

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  background-color: #4caf50;
`;

const Main = ({ failCount, matchCount, newGame, cards, revealCard }) => {
  return (
    <MainContainer>
      <Nav>
        <Title>The Concentration Game</Title>
        <Subtitle>Matches: {matchCount}</Subtitle>
        <Subtitle>Fails: {failCount}</Subtitle>
        <Button onClick={newGame}>New Game</Button>
      </Nav>
      <Table cards={cards} revealCard={revealCard} />
    </MainContainer>
  );
};

export default withDeck(Main);
