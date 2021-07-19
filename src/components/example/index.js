import React from "react";

import RepoCard from "../repo-card";

function Example({ players, handleDelete }) {
  if (players.isLoading || players.isIdle) return "Loading...";

  if (players.error) return "An error has occurred: " + players.error.message;

  const handleDeleteInternal = (id) => handleDelete(id);

  return (
    <>
      {players.data.map((item) => (
        <RepoCard
          key={item.id}
          name={item.name}
          email={item.email}
          gender={item.gender}
          handleDelete={() => handleDeleteInternal(item.id)}
        />
      ))}
    </>
  );
}
export default Example;
