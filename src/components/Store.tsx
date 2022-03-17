import { createContext, Dispatch, ReactElement, useContext, useReducer } from "react";
import { Coin } from "../types/Coin";

export interface Store {
  watchlist: Coin[];
}

export const initialStore: Store = { watchlist: [] };

interface AddToWatchlist {
  type: "addToWatchlist";
  coin: any
}

interface RemoveFromWatchlist {
  type: "removeFromWatchlist";
  coin: any
}

export type Action = AddToWatchlist | RemoveFromWatchlist;

export const reducer = (store: Store, action: Action): Store => {
  switch (action.type) {
    case "addToWatchlist":
      return {
        ...store,
        watchlist: [...store.watchlist, action.coin],
      };
    case "removeFromWatchlist": {
      const index = store.watchlist
        .map((coin) => coin.id)
        .indexOf(action.coin.id);
      return { ...store, watchlist: store.watchlist.filter((_coin, i) => i !== index) };
    }
  }
};

interface StoreContext {
  store: Store;
  dispatch: Dispatch<Action>;
}

const StoreContext = createContext({} as StoreContext);

export const useStore = (): StoreContext => useContext(StoreContext);

export default function StoreProvider(props: {
  children: ReactElement;
  store?: Store;
}): ReactElement {
  const [store, dispatch] = useReducer(reducer, props.store || { watchlist: [] });

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
}
