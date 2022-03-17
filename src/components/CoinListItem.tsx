import { Col, Row } from 'antd';
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Coin, isCoin } from "../types/Coin";
import { CoinSimple } from "../types/CoinSimple";

interface Props {
  coin: CoinSimple | Coin;
  children?: ReactElement;
}

export default function CoinListItem(props: Props): ReactElement {
  const coin = props.coin;
  let image, price, total_volume, price_change_percentage_24h, market_cap, ath, atl;

  if (isCoin(coin)) {
    image = coin.image.thumb;
    price = coin.market_data.current_price.eur.toLocaleString();
    total_volume = coin.market_data.total_volume.eur.toLocaleString();
    price_change_percentage_24h = coin.market_data.price_change_percentage_24h;
    market_cap = coin.market_data.market_cap.eur.toLocaleString();
    ath = coin.market_data.ath.eur.toLocaleString();
    atl = coin.market_data.atl.eur.toLocaleString();
  } else {
    image = coin.image;
    price = coin.current_price.toLocaleString();
    total_volume = coin.total_volume.toLocaleString();
    price_change_percentage_24h = coin.price_change_percentage_24h;
    market_cap = coin.market_cap.toLocaleString();
    ath = coin.high_24h.toLocaleString();
    atl = coin.low_24h.toLocaleString();
  }

  return (
    <Link to={`/currencies/${props.coin.id}`}>
      <Row justify="start" align="middle">
        <Col xs={6} lg={4}><img width="30" height="30" src={image} alt={coin.name} />{coin.name} ({coin.symbol})</Col>
        <Col xs={6} lg={3}>{price} €</Col>
        <Col xs={0} lg={3}>{ath} €</Col>
        <Col xs={0} lg={3}>{atl} €</Col>
        <Col xs={0} lg={3}>{total_volume.toLocaleString()} €</Col>
        <Col xs={6} lg={2}>
          <span className={price_change_percentage_24h < 0 ? ("red") : ("green")}>
            {price_change_percentage_24h.toFixed(2)}%
          </span>
        </Col>
        <Col xs={0} lg={3}>{market_cap}</Col>
        <Col xs={6} lg={3}>{props.children}</Col>
      </Row>
    </Link>
  );
}
