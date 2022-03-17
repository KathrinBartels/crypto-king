import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Tag, Typography } from 'antd';
import { ReactElement } from "react";
import { Link, useParams } from "react-router-dom";
import { useCoinApi } from "../shared/CoinApi";
import { formatToCurrency } from "../shared/formatToCurrency";
import { Coin } from "../types/Coin";
import './CoinDetails.css';
import LoadingSpinner from "./shared/LoadingSpinner";
import { useStore } from "./Store";

export default function CoinDetails(): ReactElement {
  const { store, dispatch } = useStore();
  const { id } = useParams<{ id: string }>();
  const coin = useCoinApi<Coin>(`coins/${id}`)[0];
  const { Title, Paragraph } = Typography;

  if (!coin) {
    return <LoadingSpinner />;
  }

  const addToWatchlist = () => {
    dispatch({ type: "addToWatchlist", coin });
  };

  const removeFromWatchlist = () => {
    dispatch({ type: "removeFromWatchlist", coin });
  };

  const isInWatchlist = () => {
    const coinFound = store.watchlist.findIndex(c => c.id === coin.id);
    if (coinFound > -1) {
      return true
    }
  }

  const cleanUpTags = () => {
    const tags = coin.categories;
    const filteredTags = tags.filter((tag) => tag !== null);
    return filteredTags;
  }

  return (
    <>
      <Title level={3}>
        <img src={coin.image.small} alt={coin.name} /><span className="name">{coin.name} ({coin.symbol.toLocaleUpperCase()})</span>
        {
          isInWatchlist()
            ? (<HeartFilled onClick={removeFromWatchlist} />)
            : (<HeartOutlined onClick={addToWatchlist} />)
        }
      </Title>
      <span className="rank">Rank #{coin.market_cap_rank}</span>
      <Title level={2}>
        {formatToCurrency(coin.market_data.current_price.eur)}
      </Title>
      <Paragraph>
        <Paragraph>
          All time low: {formatToCurrency(coin.market_data.atl.eur)} |
          All time high: {formatToCurrency(coin.market_data.ath.eur)}
        </Paragraph>
      </Paragraph>
      <Paragraph>
        <pre>
          <span dangerouslySetInnerHTML={{ __html: coin.description.en }}></span>
        </pre>
      </Paragraph>
      <Paragraph>Community score: {coin.community_score}</Paragraph>
      <Paragraph>Total volume: {formatToCurrency(coin.market_data.total_volume.eur)}</Paragraph>
      <Paragraph>
        {coin.links.homepage.map((link, i) => (
          <span key={i}><a href={`${link}`}>{link}</a></span>
        ))}
      </Paragraph>
      <Paragraph>
        {cleanUpTags().map((tag, i) => (
          <Tag key={i}>
            {tag}
          </Tag>
        ))}
      </Paragraph>
      <Link to="/currencies">
        <Button type="primary">Currency List</Button>
      </Link>
      {store.watchlist.length > 0 &&
        <Link to="/watchlist">
          <Button type="primary">Favourites</Button>
        </Link>
      }
    </>
  )
}
