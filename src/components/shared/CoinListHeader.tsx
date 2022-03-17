import { Row, Col } from 'antd'
import { ReactElement } from 'react'

export default function CoinListHeader(): ReactElement {
  return (
    <Row>
      <Col xs={8} lg={4}>Currency</Col>
      <Col xs={5} lg={3}>Price</Col>
      <Col xs={0} lg={3}>High in last 24h</Col>
      <Col xs={0} lg={3}>Low in last 24h</Col>
      <Col xs={0} lg={3}>Total Volume</Col>
      <Col xs={5} lg={2}>24 hours</Col>
      <Col xs={0} lg={3}>Market Cap</Col>
      <Col xs={6} lg={3}>Like</Col>
    </Row>
  )
}