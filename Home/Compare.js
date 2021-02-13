import React from "react";
import useSWR from "swr";

export const IntlFormatNumber = (bitcoin) => {
  return new Intl.NumberFormat("th-TH").format(bitcoin);
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Compare() {
  const { data: bi, error } = useSWR("/api/binance", fetcher, {
    refreshInterval: 100,
  });

  const { data: bitk } = useSWR("/api/bitkub", fetcher, {
    refreshInterval: 100,
  });

  if (!bitk) return <div>loading...</div>;

  const BITK = () => {
    if (typeof bitk !== "undefined") {
      const binance = bitk.THB_BTC.last;
      return IntlFormatNumber(binance);
    }
  };

  const BI = () => {
    if (typeof bi !== "undefined") {
      const bitcoin = bi[11].lastPrice;
      return IntlFormatNumber(bitcoin);
    }
  };

  const Binance = BI();
  const Bitkub = BITK();

  console.log("Bitkub:", bitk.THB_BTC.last);

  return (
    <div>
      <h1>Binance: {Binance}</h1>
      <h1>Bitkub: {Bitkub}</h1>
    </div>
  );
}

export default Compare;
