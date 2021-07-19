import React from "react";

import RepoCard from "../repo-card";

function Example({ players }) {
  if (players.isLoading || players.isIdle) return "Loading...";

  if (players.error) return "An error has occurred: " + players.error.message;

  return (
    <>
      {players.data.map((item) => (
        <RepoCard
          key={item.id}
          name={item.name}
          email={item.email}
          gender={item.gender}
        />
      ))}
    </>
  );
}
export default Example;
