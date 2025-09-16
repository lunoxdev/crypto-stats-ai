import { useEffect, useRef } from "react";
import { type Data } from "../types";
import gsap from "gsap";
import TableHead from "./common/TableHead"

interface CryptoTableProps {
    data: Data[];
    onRowClick: (crypto: Data) => void;
}

const CryptoTable = ({ data, onRowClick }: CryptoTableProps) => {
    // Table GSAP animation
    const tableRef = useRef<HTMLTableSectionElement | null>(null);

    useEffect(() => {
        const table = tableRef.current;
        if (!table) return;

        const rows = Array.from(table.children);
        gsap.fromTo(
            rows,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.in" }
        );
    }, [data]);


    return (
        <section className="overflow-x-auto 2xl:overflow-x-hidden w-full rounded-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-14 sm:py-14">
            <table className="min-w-full divide-y divide-sky-500">
                <thead className="bg-gradient-to-t from-sky-950/50 to-transparent">
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
                <tbody ref={tableRef} className="divide-y divide-sky-300/20">
                    {data.map((crypto, index) => (
                        <tr
                            key={crypto.id}
                            className="hover:bg-gradient-to-br from-sky-500/15 to-indigo-500/15 transition duration-300 cursor-pointer opacity-0"
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
