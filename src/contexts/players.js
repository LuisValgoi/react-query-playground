import React, { createContext, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const REACT_QUERY = {
  PLAYERS: "PLAYERS",
};

const PlayersContext = createContext();

export function PlayersProvider({ children }) {
  const [filter, setFilter] = useState("");
  const [count] = useState([]);

  return (
    <PlayersContext.Provider value={{ count, filter, setFilter }}>
      {children}
    </PlayersContext.Provider>
  );
}

export function usePlayers() {
  const context = useContext(PlayersContext);
  if (!context) throw new Error("this must be used within a provider");

  const { filter, setFilter } = context;
  const query = useQuery(REACT_QUERY.PLAYERS, fetchPlayers.bind(null, filter), {
    enabled: false,
  });

  const count = query?.data?.length ?? "...";

  return { query, view: { filter, setFilter, count } };
}

const fetchPlayers = async (filter) => {
  const param = filter ? `?name=${filter}` : "";
  const res = await fetch(`https://gorest.co.in/public/v1/users${param}`);
  const { data } = await res.json();
  const sortByName = (a, b) => {
    if (a.name > b.name) return 1;
    if (b.name > a.name) return -1;
  };
  const dataSorted = data.sort(sortByName);

  return dataSorted;
};

export function usePlayersMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation(postPlayer, {
    onSuccess: () => {
      queryClient.invalidateQueries("players");
    },
  });
}
const postPlayer = async (body) => {
  const res = await fetch("https://gorest.co.in/public/v1/users", {
    method: "POST",
    body,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
    },
  });
  const { data } = await res.json();

  return data;
};
