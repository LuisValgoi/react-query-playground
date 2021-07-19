import React, { createContext, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const REACT_QUERY = {
  PLAYERS: "PLAYERS",
};

// provider
const PlayersContext = createContext();
export function PlayersProvider({ children }) {
  const [filter, setFilter] = useState("AAA");

  return (
    <PlayersContext.Provider value={{ filter, setFilter }}>
      {children}
    </PlayersContext.Provider>
  );
}

// get
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

// add
export function usePlayersAdd() {
  const queryClient = useQueryClient();

  return useMutation(postPlayer, {
    onMutate: (newData) => {
      queryClient.cancelQueries(REACT_QUERY.PLAYERS);
      const snapshot = queryClient.getQueryData(REACT_QUERY.PLAYERS);
      const updatedData = [...snapshot, newData];
      queryClient.setQueryData(REACT_QUERY.PLAYERS, updatedData);

      return () => queryClient.setQueryData(REACT_QUERY.PLAYERS, snapshot);
    },
    onError: (error, newData, rollback) => rollback(),
    onSuccess: (newData) => {
      const snapshot = queryClient.getQueryData(REACT_QUERY.PLAYERS);
      const modifiedSnapshot = [...snapshot];
      modifiedSnapshot.forEach((v) => {
        if (v.name === newData.name) v.id = newData.id;
      });
      queryClient.setQueryData(REACT_QUERY.PLAYERS, modifiedSnapshot);

      return () => queryClient.setQueryData(REACT_QUERY.PLAYERS, snapshot);
    },
  });
}
const postPlayer = async (body) => {
  const res = await fetch("https://gorest.co.in/public/v1/users", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
    },
  });

  const { data } = await res.json();

  return data;
};

// delete
export function usePlayersDelete() {
  const queryClient = useQueryClient();

  return useMutation(deletePlayer, {
    onMutate: (id) => {
      const previousValue = queryClient.getQueryData(REACT_QUERY.PLAYERS);
      const removeDeleted = [...previousValue].filter((v) => v.id !== id);
      queryClient.setQueryData(REACT_QUERY.PLAYERS, removeDeleted);

      return () => queryClient.setQueryData(REACT_QUERY.PLAYERS, previousValue);
    },
    onError: (error, id, rollback) => rollback(),
  });
}
const deletePlayer = async (id) => {
  fetch(`https://gorest.co.in/public/v1/users/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`,
    },
  });
};
