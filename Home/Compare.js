import React from "react";
import useSWR from "swr";

export const IntlFormatNumber = (bitcoin) => {
  return new Intl.NumberFormat("th-TH").format(bitcoin);
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Compare() {
  const { data: bi, error } = useSWR("/api/binance", fetcher, {
    refreshInterval: 500,
  });

  const { data: bitk } = useSWR("/api/bitkub", fetcher, {
    refreshInterval: 500,
  });

  const { data: satang } = useSWR("/api/satang", fetcher, {
    refreshInterval: 1000,
  });

  const { data: exchange } = useSWR("/api/exchangerates", fetcher);

  if (!bitk && !bi) return <div>loading...</div>;

  const BITK = () => {
    if (typeof bitk !== "undefined") {
      const bikub = bitk.THB_BTC.last;
      return IntlFormatNumber(bikub);
    }
  };

  const BITKchange = () => {
    if (typeof bitk !== "undefined") {
      const bikub = bitk.THB_BTC.percentChange;
      return bikub;
    }
  };

  const BI = () => {
    if (typeof (bi && exchange) !== "undefined") {
      const bitcoin = bi.lastPrice;
      const ex = exchange.rates.THB;
      return IntlFormatNumber(bitcoin * ex);
    }
  };

  const BIchange = () => {
    if (typeof bi !== "undefined") {
      const binance = bi.priceChangePercent;
      return binance;
    }
  };

  const SATANG = () => {
    if (typeof satang !== "undefined") {
      const sata = satang.lastPrice;
      return IntlFormatNumber(sata);
    }
  };

  const SaChange = () => {
    if (typeof satang !== "undefined") {
      const sata = satang.priceChangePercent;
      return Number.parseFloat(sata).toFixed(2);
    }
  };

  const Binance = BI();
  const BinanceChange = BIchange();
  const Bitkub = BITK();
  const BitKubChange = BITKchange();
  const Satang = SATANG();
  const SatangChange = SaChange();

  return (
    <div>
      <h1>
        Binance: {Binance} Change 24hr: {BinanceChange}%
      </h1>
      <h1>
        Bitkub: {Bitkub} Change 24hr: {BitKubChange}%
      </h1>
      <h1>
        Satang: {Satang} Change 24hr: {SatangChange}%
      </h1>
    </div>
  );
}

export default Compare;
