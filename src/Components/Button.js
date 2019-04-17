import styled from "styled-components";

const Button = styled.button`
  font-family: "Rancho", cursive;
  font-size: 1.5rem;
  text-align: center;
  outline: none;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 0.4rem 0 -0.1rem #15781b66;
  margin: 0.4rem;

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 0.1rem #15781b66;
    transform: translateY(4px);
  }
`;

export default Button;
