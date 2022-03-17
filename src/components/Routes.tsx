import { ReactElement } from "react";
import { Navigate, Route, Routes as RRDRoutes } from "react-router-dom";
import CoinDetails from "./CoinDetails";
import CoinList from "./CoinList";
import Watchlist from "./Watchlist";

export default function Routes(): ReactElement {
  return (
    <RRDRoutes>
      <Route path="/" element={<Navigate to="/currencies" />} />
      <Route path="/currencies" element={<CoinList />} />
      <Route path="/currencies/:id" element={<CoinDetails />} />
      <Route path="/watchlist" element={<Watchlist />} />
    </RRDRoutes>
  );
}
