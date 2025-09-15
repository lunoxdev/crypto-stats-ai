import React from "react";
import { Data } from "../../types";

interface CryptoTableProps {
    data: Data[];
}

const CryptoTable = ({ data }: CryptoTableProps) => {
    return (
        <section className="overflow-x-auto w-full rounded-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <table className="min-w-full divide-y divide-sky-500">
                <thead className="bg-gradient-to-t from-sky-500/20 from-5% to-black">
                    <tr>
                        <th className="px-3 py-6 text-left text-sm uppercase tracking-wider text-sky-200 font-bold text-nowrap">
                            #
                        </th>
                        <th className="px-3 py-6 text-left text-sm uppercase tracking-wider text-sky-200 font-bold text-nowrap">
                            Name
                        </th>
                        <th className="px-3 py-6 text-left text-sm uppercase tracking-wider text-sky-200 font-bold text-nowrap">
                            Price
                        </th>
                        <th className="px-3 py-6 text-left text-sm uppercase tracking-wider text-sky-200 font-bold text-nowrap">
                            1h %
                        </th>
                        <th className="px-3 py-6 text-left text-sm uppercase tracking-wider text-sky-200 font-bold text-nowrap">
                            24h %
                        </th>
                        <th className="px-3 py-6 text-left text-sm uppercase tracking-wider text-sky-200 font-bold text-nowrap">
                            7d %
                        </th>
                        <th className="px-3 py-6 text-left text-sm uppercase tracking-wider text-sky-200 font-bold text-nowrap">
                            Market Cap
                        </th>
                        <th className="px-3 py-6 text-left text-sm uppercase tracking-wider text-sky-200 font-bold text-nowrap">
                            Volume(24h)
                        </th>
                        <th className="px-3 py-6 text-left text-sm uppercase tracking-wider text-sky-200 font-bold text-nowrap">
                            Circulating Supply
                        </th>
                        {/* <th className="px-3 py-3 text-left text-sm uppercase tracking-wider text-sky-200 font-bold text-nowrap">
                            Last 7 Days
                        </th> */}
                    </tr>
                </thead>
                <tbody className="divide-y divide-sky-300/20">
                    {data.map((crypto, index) => (
                        <tr
                            key={crypto.id}
                            className="hover:bg-gradient-to-t from-sky-500/10 to-sky-500/20 transition duration-75"
                        >
                            <td className="px-3 py-4 whitespace-nowrap text-xs sm:text-base font-medium text-amber-500">
                                {index + 1}
                            </td>
                            <td className="pr-6 py-4 whitespace-nowrap text-xs sm:text-base">
                                <div className="flex items-center">
                                    <img
                                        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                                        alt={`${crypto.name} logo`}
                                        className="w-6 h-6 mr-2"
                                    />
                                    {crypto.name} ({crypto.symbol})
                                </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-base">
                                ${crypto.quote.USD.price.toFixed(2)}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-base">
                                <span
                                    className={
                                        crypto.quote.USD.percent_change_1h >= 0
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }
                                >
                                    {crypto.quote.USD.percent_change_1h >= 0 ? "▲" : "▼"}
                                    {crypto.quote.USD.percent_change_1h.toFixed(2)}%
                                </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-base">
                                <span
                                    className={
                                        crypto.quote.USD.percent_change_24h >= 0
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }
                                >
                                    {crypto.quote.USD.percent_change_24h >= 0 ? "▲" : "▼"}
                                    {crypto.quote.USD.percent_change_24h.toFixed(2)}%
                                </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-base">
                                <span
                                    className={
                                        crypto.quote.USD.percent_change_7d >= 0
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }
                                >
                                    {crypto.quote.USD.percent_change_7d >= 0 ? "▲" : "▼"}
                                    {crypto.quote.USD.percent_change_7d.toFixed(2)}%
                                </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-bas">
                                ${crypto.quote.USD.market_cap.toLocaleString()}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-base">
                                ${crypto.quote.USD.volume_24h.toLocaleString()}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-base">
                                {crypto.circulating_supply.toLocaleString()} {crypto.symbol}
                            </td>
                            {/* <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-base  dark:text-gray-200">
                                TODO: Add chart here
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default CryptoTable;
