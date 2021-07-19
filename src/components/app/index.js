import React, { useEffect } from "react";
import { debounce } from "lodash";

import useBreakpoints from "../../hooks/useBreakpoints";
import { usePlayers } from "../../contexts/players";

import Example from "../example";
import * as SC from "./style";

function App() {
  const breakpoint = useBreakpoints();
  const { query, view } = usePlayers();

  const handleFilterChange = debounce((e) => {
    view.setFilter(e.target.value);
  }, 500);

  useEffect(() => query.refetch(), [view.filter]);

  return (
    <SC.Wrapper>
      <SC.Header>
        <SC.Title>{`Players (${view.count})`}</SC.Title>
        <SC.Input defaultValue={view.filter} onChange={handleFilterChange} />
      </SC.Header>
      <SC.Container $breakpoint={breakpoint}>
        <Example players={query} />
      </SC.Container>
    </SC.Wrapper>
  );
}

export default App;
