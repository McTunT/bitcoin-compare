import Cors from "cors";
import fetch from "node-fetch";
import initMiddleware from "../../libs/init-middleware";

const cors = Cors({
  methods: ["GET"],
});

const url = "https://pro-api.coinmarketcap.com/v1/exchange/listings/historical";

export default async (req, res) => {
  const response = await fetch(url, {
    body: null,
    headers: {
      "Content-Type": "application/json",
      "X-CMC_PRO_API_KEY": "dbb2f46e-f3ea-4e0f-80c4-8805ad201536",
    },
  });

  await initMiddleware(req, res, cors);
  const coinbase = await response.json();
  return res.status(200).json(coinbase);
};
