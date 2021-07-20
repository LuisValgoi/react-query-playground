import React, { useEffect } from "react";
import { debounce } from "lodash";

import useBreakpoints from "../../hooks/useBreakpoints";
import { usePlayers, usePlayersAdd } from "../../contexts/players";

import Example from "../example";
import * as SC from "./style";

function App() {
  const breakpoint = useBreakpoints();
  const rqAdd = usePlayersAdd();
  const { query, view } = usePlayers();

  const handleFilterChange = debounce((e) => {
    view.setFilter(e.target.value);
  }, 500);

  const handleAddRandom = () =>
    rqAdd.mutate({
      id: Date.now(),
      name: `AAAA${Date.now()}`,
      gender: "male",
      email: `AAAA${Date.now()}.AAAA@AAA.com`,
      status: "active",
    });

  useEffect(() => query.refetch(), [view.filter]);

  return (
    <SC.Wrapper>
      <SC.Header>
        <SC.Title>{`Players (${view.count})`}</SC.Title>
        <SC.HeaderActionWrappers>
          <Pagination view={view} query={query} />
          <SC.Button onClick={handleAddRandom}>Add Random Player</SC.Button>
          <SC.Input defaultValue={view.filter} onChange={handleFilterChange} />
        </SC.HeaderActionWrappers>
      </SC.Header>
      <SC.Container $breakpoint={breakpoint}>
        <Example players={query} />
      </SC.Container>
    </SC.Wrapper>
  );
}

export default App;

const Pagination = ({ view, query }) => {
  const isPreviousData = query.isPreviousData;
  const currentPage = query.data?.meta?.pagination?.page;
  const availablePages = query.data?.meta?.pagination?.pages;

  return (
    <SC.PaginationWrapper>
      <button
        disabled={view.page === 1}
        onClick={() => view.setPage((old) => Math.max(old - 1, 0))}
      >
        {`<`}
      </button>
      <SC.PaginationCurrentPage>{view.page}</SC.PaginationCurrentPage>
      <button
        disabled={isPreviousData || currentPage === availablePages}
        onClick={() => {
          if (!isPreviousData && currentPage < availablePages) {
            view.setPage((old) => old + 1);
          }
        }}
      >
        {`>`}
      </button>
    </SC.PaginationWrapper>
  );
};
