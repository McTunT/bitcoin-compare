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
    <div className="flex flex-wrap items-center justify-around max-w-screen-lg mt-24 sm:w-full ">
      <div className="p-6 mt-6 text-left border w-80 rounded-xl focus:text-blue-600 text-center ">
        <img
          src="/bitkub-logo.jpg"
          alt="Vercel Logo"
          className="max-w-md mx-auto h-20"
        />
        <div className="text-xl">{Bitkub}</div>
        <div
          className=""
          style={{
            color: BitKubChange > 0 ? "#019716" : "#e60000",
          }}
        >
          {BitKubChange}%
        </div>
      </div>
      <div className="p-6 mt-6 text-left border w-80 rounded-xl focus:text-blue-600 text-center">
        <img
          src="/binance-logo.png"
          alt="Vercel Logo"
          className="max-w-md mx-auto h-20"
        />
        <div className="text-xl">{Binance}</div>
        <div
          className=""
          style={{
            color: BinanceChange > 0 ? "#019716" : "#e60000",
          }}
        >
          {BinanceChange}%
        </div>
      </div>

      <div className="p-6 mt-6 text-left border w-80 rounded-xl focus:text-blue-600 text-center">
        <img
          src="/satang-pro.png"
          alt="Vercel Logo"
          className="max-w-md mx-auto h-10 my-5"
        />
        <div className="text-xl">{Satang} </div>
        <div
          className=""
          style={{
            color: SatangChange > 0 ? "#019716" : "#e60000",
          }}
        >
          {SatangChange}%
        </div>
      </div>
    </div>
  );
}

export default Compare;
