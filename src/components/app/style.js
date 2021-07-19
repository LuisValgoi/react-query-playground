import styled from "@emotion/styled";

export const Title = styled.h1`
  margin: 0px 0px 10px 0px;
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1080px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div((props) => {
  let gridTemplateColumns = 1;
  if (props.$breakpoint === "md") gridTemplateColumns = 2;
  if (props.$breakpoint === "lg") gridTemplateColumns = 3;

  return {
    display: "grid",
    gridGap: "10px",
    gridTemplateColumns: `repeat(${gridTemplateColumns}, 1fr)`,
  };
});

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Input = styled.input`
  padding: 1rem;
  border-radius: 10px;
  outline: 2px solid transparent;
  outline-offset: 2px;
  border: 2px solid black;

  &:focus {
    border: 2px solid grey;
  }
`;
