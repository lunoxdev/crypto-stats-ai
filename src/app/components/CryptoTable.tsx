import { type Data } from "../../types";

interface CryptoTableProps {
    data: Data[];
    onRowClick: (crypto: Data) => void;
}

const TableHead = ({ text }: { text: string }) => {
    return (
        <th className="px-3 py-4 text-left text-sm uppercase tracking-wider text-sky-200 font-bold text-nowrap">
            {text}
        </th>
    )
}

const CryptoTable = ({ data, onRowClick }: CryptoTableProps) => {
    return (
        <section className="overflow-x-auto w-full rounded-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <table className="min-w-full divide-y divide-sky-500">
                <thead className="bg-gradient-to-t from-sky-500/20 from-10% via-sky-950/70 via-10% to-black">
                    <tr>
                        <TableHead text="#" />
                        <TableHead text="Name" />
                        <TableHead text="Price" />
                        <TableHead text="1h %" />
                        <TableHead text="24h %" />
                        <TableHead text="7d %" />
                        <TableHead text="Market Cap" />
                        <TableHead text="Volume(24h)" />
                        <TableHead text="Circulating Supply" />
                        {/* <TableHead text="Last 7 Days" /> */}
                    </tr>
                </thead>
                <tbody className="divide-y divide-sky-300/20">
                    {data.map((crypto, index) => (
                        <tr
                            key={crypto.id}
                            className="hover:bg-gradient-to-br from-sky-500/15 to-indigo-500/15 transition duration-75 cursor-pointer"
                            onClick={() => onRowClick(crypto)}
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
                            <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-base">
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
