import React, { useState } from "react";
import { usePlayersDelete, usePlayersEdit } from "../../contexts/players";

import * as SC from "./style";

export default function RepoCard({ id, name, email, gender }) {
  const rqEdit = usePlayersEdit();
  const rqDelete = usePlayersDelete();

  const [form, setForm] = useState({ name, email, gender });
  const [viewMode, setViewMode] = useState("read");
  const isReadMode = viewMode === "read";
  const isEditMode = viewMode === "edit";

  const handleEditInternal = () => setViewMode("edit");
  const handleCancelInternal = () => setViewMode("read");
  const handleSaveInternal = () => {
    setViewMode("read");
    handleEdit(form);
  };
  const handleChangeForm = (e, f) => {
    setForm({ ...form, [f]: e.target.value });
  };

  const handleEdit = (form) =>
    rqEdit.mutate({
      id: id,
      name: form.name,
      email: form.email,
      gender: form.gender,
    });

  const handleDelete = () => rqDelete.mutate(id);

  return (
    <SC.Wrapper>
      {isReadMode && <SC.Title>{`${form.name}`}</SC.Title>}
      {isEditMode && (
        <SC.Input
          defaultValue={form.name}
          onChange={(e) => handleChangeForm(e, "name")}
        />
      )}

      {isEditMode && <SC.Space />}

      {isReadMode && <SC.Paragraph>{form.email}</SC.Paragraph>}
      {isEditMode && (
        <SC.Input
          defaultValue={form.email}
          onChange={(e) => handleChangeForm(e, "email")}
        />
      )}

      <SC.Paragraph $hasMarginTop>
        <SC.Span>⚥ </SC.Span>
        <strong>{form.gender}</strong>
      </SC.Paragraph>

      <SC.FooterWrapper>
        <SC.Button onClick={handleDelete}>🗑️ </SC.Button>
        {isReadMode && <SC.Button onClick={handleEditInternal}>✏️ </SC.Button>}
        {isEditMode && <SC.Button onClick={handleCancelInternal}>❌</SC.Button>}
        {isEditMode && (
          <SC.Button onClick={handleSaveInternal}>
            {rqEdit.isLoading ? `⌛` : `💾`}
          </SC.Button>
        )}
      </SC.FooterWrapper>
    </SC.Wrapper>
  );
}
