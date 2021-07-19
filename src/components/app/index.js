import React, { useEffect } from "react";
import { debounce } from "lodash";

import useBreakpoints from "../../hooks/useBreakpoints";
import { usePlayers, usePlayersAdd } from "../../contexts/players";

import Example from "../example";
import * as SC from "./style";

function App() {
  const breakpoint = useBreakpoints();
  const { query, view } = usePlayers();
  const rqAdd = usePlayersAdd();

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
        <div>
          <SC.Button onClick={handleAddRandom}>Add Random Player</SC.Button>
          <SC.Input defaultValue={view.filter} onChange={handleFilterChange} />
        </div>
      </SC.Header>
      <SC.Container $breakpoint={breakpoint}>
        <Example players={query} />
      </SC.Container>
    </SC.Wrapper>
  );
}

export default App;
