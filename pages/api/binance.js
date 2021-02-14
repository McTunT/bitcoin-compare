import Cors from "cors";
import fetch from "node-fetch";
import initMiddleware from "../../libs/init-middleware";

const cors = Cors({
  methods: ["GET"],
});

const url = "https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT";

// http://27.254.77.78/rest/public/rest/goldspot

export default async (req, res) => {
  const response = await fetch(url, {
    body: null,
    headers: { "Content-Type": "application/json" },
  });

  await initMiddleware(req, res, cors);
  const binance = await response.json();
  return res.status(200).json(binance);
};
