import React from "react";

import * as SC from "./style";

export default function RepoCard({ name, email, gender, handleDelete }) {
  return (
    <SC.Wrapper>
      <SC.Title>{`${name}`}</SC.Title>
      <SC.Paragraph>{email}</SC.Paragraph>
      <SC.Paragraph $hasMarginTop>
        <SC.Span>⚥ </SC.Span>
        <strong>{gender}</strong>
      </SC.Paragraph>
      <SC.FooterWrapper>
        <SC.Button onClick={handleDelete}>🗑️ </SC.Button>
      </SC.FooterWrapper>
    </SC.Wrapper>
  );
}
