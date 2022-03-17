import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { ReactElement } from 'react';
import { useCoinApi } from '../shared/CoinApi';
import { CoinSimple } from '../types/CoinSimple';
import CoinListItem from './CoinListItem';
import CoinListHeader from './shared/CoinListHeader';
import LoadingSpinner from './shared/LoadingSpinner';
import { Action, useStore } from './Store';

export default function CoinList(): ReactElement {
  const { store, dispatch } = useStore();
  const path = "coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  const [coins] = useCoinApi<CoinSimple[]>(path);

  if (!coins) {
    return <LoadingSpinner />;
  }

  const addToWatchlist = (e: React.MouseEvent, action: Action): void => {
    e.preventDefault();
    dispatch(action);
  };

  const removeFromWatchlist = (e: React.MouseEvent, action: Action): void => {
    e.preventDefault();
    dispatch(action);
  };

  const isInWatchlist = (id: any): any => {
    const coinFound = store.watchlist.findIndex(c => c.id === id);
    if (coinFound > -1) {
      return true
    }
  }

  return (
    <>
      <CoinListHeader />
      {coins.map((coin) => (
        <CoinListItem coin={coin} key={coin.id}>
          {isInWatchlist(coin.id) ? (
            <HeartFilled onClick={(e) => removeFromWatchlist(e, { type: "removeFromWatchlist", coin })} />
          ) : (
            <HeartOutlined onClick={(e) => addToWatchlist(e, { type: "addToWatchlist", coin })} />
          )}
        </CoinListItem>
      ))}
    </>
  )
}
