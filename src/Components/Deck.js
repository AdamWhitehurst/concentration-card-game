import React, { useState } from "react";
import axios from "axios";
import CARD_CODES from "../card_codes";
const API = axios.create({
  baseURL: "https://deckofcardsapi.com/api/deck/",
  timeout: 1000,
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

const withDeck = Component => {
  const DeckedComponent = () => {
    const [cards, setCards] = useState(null);
    const [revealedCard, setRevealedCard] = useState(null);
    const [stalled, setStalled] = useState(false);
    const [matchCount, setMatchCount] = useState(0);
    const [failCount, setFailCount] = useState(0);

    function awardPlayer() {
      // I wish this function did something more... rewarding.
      setMatchCount(matchCount + 1);
    }

    function setResetCards(idOne, idtwo, matched = false) {
      // No more revealed card
      setRevealedCard(null);
      // Delay unflipping to show user the cards they flipped
      setTimeout(() => {
        if (matched) awardPlayer();
        else setFailCount(failCount + 1);

        let newCards = cards.map(card => {
          if (card.id !== idOne && card.id !== idtwo) return card;
          return {
            ...card,
            matched: matched,
            revealed: false
          };
        });
        setStalled(false);
        setCards(newCards);
      }, 750);
    }

    function revealCard(c) {
      // Prevent unwanted flips
      if (stalled || c.revealed === true || c.matched === true) return;

      if (!revealedCard) {
        // First card being flipped, save it
        setRevealedCard(c);
      } else if (revealedCard.code !== c.code) {
        // Second card flipped but no match
        setStalled(true);
        setResetCards(revealedCard.id, c.id);
      } else {
        // Second card flipped and a match
        setStalled(true);
        setResetCards(revealedCard.id, c.id, true);
      }

      // Update deck of cards
      const newCards = cards.map(card => {
        if (card.id !== c.id) return card;
        return {
          ...card,
          revealed: true
        };
      });

      setCards(newCards);
    }

    async function newGame() {
      // Contruct a new deck of 26 cards
      let resp = await API.get(`new/shuffle/?cards=${[...CARD_CODES]}`);

      if (resp.data.success) {
        console.log("New deck ID:", resp.data.deck_id);
      } else {
        console.warn("Error:", resp.data.error);
      }
      setMatchCount(0);
      setFailCount(0);
      pullCards(resp.data.deck_id);
    }

    async function pullCards(deckID) {
      // Get the 26 card deck ...
      let respOne = await API.get(`${deckID}/draw/`, {
        params: { count: 26 }
      });
      // Shuffle it ...
      await API.get(`${deckID}/shuffle/`);
      // Get the same deck in a different order ...
      let respTwo = await API.get(`${deckID}/draw/`, {
        params: { count: 26 }
      });
      // Attach indexes and properties to card ...
      const firstHalf = respOne.data.cards.map((card, idx) => {
        return { id: idx, matched: false, revealed: false, ...card };
      });
      const secondHalf = respTwo.data.cards.map((card, idx) => {
        return { id: idx + 26, matched: false, revealed: false, ...card };
      });
      // Smoosh 'em together and save it.
      const cards = [...firstHalf, ...secondHalf];
      console.log("No cheating ...", cards);
      setCards(cards);
    }

    return (
      <Component
        matchCount={matchCount}
        failCount={failCount}
        newGame={newGame}
        cards={cards}
        revealCard={revealCard}
      />
    );
  };

  return DeckedComponent;
};

export default withDeck;
