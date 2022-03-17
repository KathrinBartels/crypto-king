import { FrownOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import { ReactElement } from 'react';
import { Coin } from '../types/Coin';
import CoinListItem from './CoinListItem';
import CoinListHeader from './shared/CoinListHeader';
import { Action, useStore } from './Store';

export default function Watchlist(): ReactElement {
  const { store, dispatch } = useStore();

  const coins = store.watchlist
    .reduce((acc: Coin[], coin) => {
      acc.find((coin_) => coin_.id === coin.id) || acc.push(coin);
      return acc;
    }, [])
    .sort((coinA, coinB) => Number(coinA.id) - Number(coinB.id));

  const removeFromWatchlist = (e: React.MouseEvent, action: Action): void => {
    e.preventDefault();
    dispatch(action);
    notification.open({
      message: '',
      description: 'Removed from watchlist',
      icon: <FrownOutlined style={{ color: '#108ee9' }} />
    })
  };

  return coins.length !== 0 ? (
    <>
      <CoinListHeader />
      {coins.map((coin) => (
        <CoinListItem key={coin.id} coin={coin}>
          <Button type="primary" onClick={(e) => removeFromWatchlist(e, { type: "removeFromWatchlist", coin })}>Remove</Button>
        </CoinListItem>
      ))}
    </>
  ) : (
    <p>Add items to list</p>
  )
}