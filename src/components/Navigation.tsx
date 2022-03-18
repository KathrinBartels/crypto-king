import { DollarCircleOutlined, HeartFilled } from '@ant-design/icons';
import { Menu } from 'antd';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from './Store';

export default function Navigation(): ReactElement {
  const { store } = useStore();

  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="currencies" icon={<DollarCircleOutlined />}>
          <NavLink to="/currencies">Cryptocurrencies</NavLink>
        </Menu.Item>
        {store.watchlist.length > 0 &&
          <Menu.Item key="watchlist" icon={<HeartFilled />}>
            <NavLink to="/watchlist">Favourites</NavLink>
          </Menu.Item>
        }
      </Menu>
    </>
  );
}
