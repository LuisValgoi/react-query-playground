import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { PlayersProvider } from "../../contexts/players";

export default function Provider(props) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <PlayersProvider>{props.children}</PlayersProvider>
    </QueryClientProvider>
  );
}
