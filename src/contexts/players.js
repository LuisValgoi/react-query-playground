import React, { createContext, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const REACT_QUERY = {
  PLAYERS: "PLAYERS",
};

// provider
const PlayersContext = createContext();
export function PlayersProvider({ children }) {
  const [filter, setFilter] = useState("AAA");
  const [page, setPage] = useState(1);

  return (
    <PlayersContext.Provider value={{ filter, setFilter, page, setPage }}>
      {children}
    </PlayersContext.Provider>
  );
}

// get
export function usePlayers() {
  const context = useContext(PlayersContext);
  if (!context) throw new Error("this must be used within a provider");

  const { filter, setFilter, page, setPage } = context;
  const query = useQuery(
    [REACT_QUERY.PLAYERS, page],
    fetchPlayers.bind(null, filter, page),
    {
      enabled: true,
      keepPreviousData: false,
    }
  );

  const count = query?.data?.data?.length ?? "...";

  return { query, view: { filter, setFilter, page, setPage, count } };
}
const fetchPlayers = async (name, page) => {
  const params = new URLSearchParams({ name });
  page > 0 && params.append("page", page);

  const res = await fetch(`https://gorest.co.in/public/v1/users?${params}`);

  const data = await res.json();
  const sortByName = (a, b) => {
    if (a.name > b.name) return 1;
    if (b.name > a.name) return -1;
  };

  const dataSorted = data.data.sort(sortByName);
  data.data = dataSorted;
  return data;
};

// add
export function usePlayersAdd() {
  const queryClient = useQueryClient();
  const context = useContext(PlayersContext);
  if (!context) throw new Error("this must be used within a provider");
  const { page } = context;

  return useMutation(postPlayer, {
    onMutate: (newData) => {
      queryClient.cancelQueries([REACT_QUERY.PLAYERS, page]);
      const snapshot = queryClient.getQueryData([REACT_QUERY.PLAYERS, page]);
      const updatedSnapshot = {
        ...snapshot,
        data: [...snapshot.data, newData],
      };
      queryClient.setQueryData([REACT_QUERY.PLAYERS, page], updatedSnapshot);

      return () =>
        queryClient.setQueryData([REACT_QUERY.PLAYERS, page], snapshot);
    },
    onError: (error, newData, rollback) => rollback(),
    onSuccess: (newData) => {
      const snapshot = queryClient.getQueryData([REACT_QUERY.PLAYERS, page]);
      const updatedSnapshot = { ...snapshot };
      updatedSnapshot.data.forEach((v) => {
        if (v.name === newData.name) v.id = newData.id;
      });
      queryClient.setQueryData([REACT_QUERY.PLAYERS, page], updatedSnapshot);

      return () =>
        queryClient.setQueryData([REACT_QUERY.PLAYERS, page], snapshot);
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
  const context = useContext(PlayersContext);
  if (!context) throw new Error("this must be used within a provider");
  const { page } = context;

  return useMutation(deletePlayer, {
    onMutate: (id) => {
      const snapshot = queryClient.getQueryData([REACT_QUERY.PLAYERS, page]);
      const removeDeleted = [...snapshot.data].filter((v) => v.id !== id);
      queryClient.setQueryData([REACT_QUERY.PLAYERS, page], {
        ...snapshot,
        data: removeDeleted,
      });

      return () =>
        queryClient.setQueryData([REACT_QUERY.PLAYERS, page], snapshot);
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

// edit
export function usePlayersEdit() {
  const queryClient = useQueryClient();
  const context = useContext(PlayersContext);
  if (!context) throw new Error("this must be used within a provider");
  const { page } = context;

  return useMutation(editPlayer, {
    onMutate: (editData) => {
      queryClient.cancelQueries([REACT_QUERY.PLAYERS, page]);
      const snapshot = queryClient.getQueryData([REACT_QUERY.PLAYERS, page]);
      const modifiedSnapshot = { ...snapshot };
      modifiedSnapshot.data.forEach((v) => {
        if (v.id === editData.name) {
          v.name = editData.form.name;
          v.email = editData.form.email;
        }
      });
      queryClient.setQueryData([REACT_QUERY.PLAYERS, page], modifiedSnapshot);

      return () =>
        queryClient.setQueryData([REACT_QUERY.PLAYERS, page], snapshot);
    },
    onError: (error, newData, rollback) => rollback(),
    onSuccess: (newData) => {
      const snapshot = queryClient.getQueryData([REACT_QUERY.PLAYERS, page]);
      const modifiedSnapshot = { ...snapshot };
      modifiedSnapshot.data.forEach((v) => {
        if (v.id === newData.id) v = { ...newData };
      });
      queryClient.setQueryData([REACT_QUERY.PLAYERS, page], modifiedSnapshot);

      return () =>
        queryClient.setQueryData([REACT_QUERY.PLAYERS, page], snapshot);
    },
  });
}
const editPlayer = async (body) => {
  const res = await fetch(`https://gorest.co.in/public/v1/users/${body.id}`, {
    method: "PUT",
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
