import { NextResponse } from "next/server";
import axios from "axios";
import { type Data } from "@/types";

export async function GET() {
  try {
    const response = await axios.get<{ data: Data[] }>(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
        },
      }
    );
    return NextResponse.json(response.data.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error from CoinMarketCap" },
      { status: 500 }
    );
  }
}
