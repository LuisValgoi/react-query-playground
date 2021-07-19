import React from "react";

import styled from "@emotion/styled";

export default function RepoCard({ name, email, gender }) {
  return (
    <Wrapper>
      <Title>{`${name}`}</Title>
      <Paragraph>{email}</Paragraph>
      <Paragraph $hasMarginTop>
        <Span>⚥ </Span>
        <strong>{gender}</strong>
      </Paragraph>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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

const Title = styled.h2`
  margin: 0px 0px 10px 0px;
`;

const Paragraph = styled.p((props) => ({
  fontSize: "16px",
  margin: "0px",
  marginTop: props.$hasMarginTop && "5px",
}));

const Span = styled.span`
  margin-right: 10px;
  font-size: 25px;
`;
