import styled from "@emotion/styled";

export const Wrapper = styled.div`
  margin: 1rem 0rem;
  padding: 1.5rem;
  background-color: white;
  box-shadow: 0px 0px 5px 1px lightgrey;
  border: 0px;
  display: flex;
  flex-direction: column;
  border-radius: 0.2rem;

  &:hover {
    background-color: #fafafa;
  }
`;

export const Title = styled.h2`
  margin: 0px 0px 10px 0px;
`;

export const Paragraph = styled.p((props) => ({
  fontSize: "16px",
  margin: "0px",
  marginTop: props.$hasMarginTop && "5px",
}));

export const Span = styled.span`
  margin-right: 10px;
  font-size: 25px;
`;

export const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Button = styled.button`
  margin-left: 5px;
  background-color: transparent;
  width: fit-content;

  outline: 2px solid transparent;
  outline-offset: 2px;
  padding-right: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ededed;
  }
`;

export const Input = styled.input`
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  outline: 2px solid transparent;
  outline-offset: 2px;
  border: 2px solid black;

  &:focus {
    border: 2px solid lightgrey;
  }
`;

export const Space = styled.div`
  height: 5px;
`;
