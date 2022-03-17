import { Row, Col } from 'antd'
import { ReactElement } from 'react'

export default function CoinListHeader(): ReactElement {
  return (
    <Row>
      <Col span={3}>Currency</Col>
      <Col span={3}>Current Price</Col>
      <Col span={3}>High in last 24h</Col>
      <Col span={3}>Low in last 24h</Col>
      <Col span={3}>Total Volume</Col>
      <Col span={3}>Change in 24h</Col>
      <Col span={3}>Market Cap</Col>
      <Col span={3}>Watchlist</Col>
    </Row>
  )
}