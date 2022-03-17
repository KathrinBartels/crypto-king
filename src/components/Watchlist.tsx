import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { ReactElement, useState } from 'react';
import { Coin } from '../types/Coin';
import CoinListItem from './CoinListItem';
import CoinListHeader from './shared/CoinListHeader';
import { Action, useStore } from './Store';

export default function Watchlist(): ReactElement {
  const { store, dispatch } = useStore();
  const [search, setSearch] = useState("");

  const coins = store.watchlist
    .reduce((acc: Coin[], coin) => {
      acc.find((coin_) => coin_.id === coin.id) || acc.push(coin);
      return acc;
    }, [])
    .sort((coinA, coinB) => Number(coinA.id) - Number(coinB.id));

  const removeFromWatchlist = (e: React.MouseEvent, action: Action): void => {
    e.preventDefault();
    dispatch(action);
  };

  const handleChange = (e: any) => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return coins.length !== 0 ? (
    <>
      <Input size="large" placeholder="search" onChange={handleChange} prefix={<SearchOutlined />} />
      <CoinListHeader />
      {filteredCoins.map((coin) => (
        <CoinListItem key={coin.id} coin={coin}>
          <Button size="small" type="default" onClick={(e) => removeFromWatchlist(e, { type: "removeFromWatchlist", coin })}>Remove</Button>
        </CoinListItem>
      ))}
    </>
  ) : (
    <p>Add items to list</p>
  )
}