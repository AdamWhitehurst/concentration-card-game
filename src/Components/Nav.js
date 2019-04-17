import styled from "styled-components";

const Nav = styled.div`
  display: flex;
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  z-index: 10;
  justify-content: space-between;
  flex: 1;
  background-color: #a9e2ad;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  box-shadow: 0 0.4rem 0 -0.1rem #15781b66;
`;

export default Nav;
