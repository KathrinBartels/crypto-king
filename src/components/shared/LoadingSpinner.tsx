import { ReactElement } from "react";
import { Spin } from 'antd';

export default function LoadingSpinner(): ReactElement {
  return <Spin tip="Loading" />
}
