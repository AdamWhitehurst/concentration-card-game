import React from "react";
import styled from "styled-components";
import Card from "./Card";

const TableContainer = styled.div`
  flex: 25;
  width: 100%;
  display: grid;
  justify-content: stretch;
  justify-items: center;
  align-items: center;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(13, 1fr);
  grid-gap: 0.25rem 0.25rem;
  padding: 0.25rem;
`;

const Table = ({ cards, revealCard }) => {
  const renderCards = () =>
    cards.map((card, idx) => {
      const cardImgSrc = card.matched
        ? ""
        : card.revealed
        ? card.images.png
        : "https://opengameart.org/sites/default/files/card%20back%20red.png";

      return (
        <Card
          key={idx}
          onClick={() => {
            revealCard(card);
          }}
          src={cardImgSrc}
        />
      );
    });

  return <TableContainer>{cards && renderCards()}</TableContainer>;
};

export default Table;
