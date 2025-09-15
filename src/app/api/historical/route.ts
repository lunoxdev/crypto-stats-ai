import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const timeframe = searchParams.get("timeframe");

  if (!id || !timeframe) {
    return NextResponse.json(
      { message: "Missing id or timeframe parameter" },
      { status: 400 }
    );
  }

  // Number of days based on the selected timeframe
  let interval = "daily";
  let days = "1";

  switch (timeframe) {
    case "1D":
      days = "1";
      break;
    case "7D":
      days = "7";
      break;
    case "1M":
      days = "30";
      break;
    case "1Y":
      days = "365";
      break;
    default:
      days = "1";
  }

  try {
    const response = await axios.get(
      // I use coingecko free api here to avoid spending free coinmarketcap credits
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: days,
          interval: interval,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching historical data",
        error: error,
      },
      { status: 500 }
    );
  }
}
