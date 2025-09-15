import { useState, useEffect } from "react";
import { type Data, type CryptoDetailModalProps } from "../../types";
import dynamic from "next/dynamic";
import { timeframes, getChartOptions, getSeries } from "../../lib/chartConfig";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CryptoDetailModal = ({
    isOpen,
    onClose,
    crypto,
    allCryptos,
}: CryptoDetailModalProps) => {
    const [chartData, setChartData] = useState<number[][]>([]);
    const [comparisonChartData, setComparisonChartData] = useState<number[][]>(
        []
    );
    const [timeframe, setTimeframe] = useState<string>("1D");
    const [comparedCrypto, setComparedCrypto] = useState<Data | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredCryptos, setFilteredCryptos] = useState<Data[]>([]);

    useEffect(() => {
        // If search term is empty, clear filtered list and exit
        if (searchTerm === "") {
            setFilteredCryptos([]);
            return;
        }

        // Normalize search term to lowercase for case-insensitive matching
        const lowercasedSearchTerm = searchTerm.toLowerCase();

        // Filter cryptos by name or symbol matching the search term
        const results = allCryptos.filter(
            (c) =>
                c.name.toLowerCase().includes(lowercasedSearchTerm) ||
                c.symbol.toLowerCase().includes(lowercasedSearchTerm)
        );

        // Update filtered list excluding the currently selected crypto
        setFilteredCryptos(results.filter((c) => c.id !== crypto?.id));
    }, [searchTerm, allCryptos, crypto]);

    useEffect(() => {
        // Exit if no main crypto is selected
        if (!crypto) return;

        // Helper to fetch historical price data for a given crypto and update state
        const fetchHistoricalData = async (
            selectedCrypto: Data,
            setter: React.Dispatch<React.SetStateAction<number[][]>>
        ) => {
            try {
                const response = await fetch(
                    `/api/historical?id=${selectedCrypto.slug}&timeframe=${timeframe}`
                );
                const data = await response.json();
                console.log("Client-side API Response for historical data:", data);
                setter(data.prices || []); // Update chart data or set empty array if no prices
            } catch (error) {
                console.error("Error fetching historical data:", error);
                setter([]); // Clear chart data on error
            }
        };

        // Fetch historical data for the main crypto
        fetchHistoricalData(crypto, setChartData);

        if (comparedCrypto) {
            // Fetch historical data for the crypto being compared
            fetchHistoricalData(comparedCrypto, setComparisonChartData);
        } else {
            // Clear comparison chart data if no crypto is selected for comparison
            setComparisonChartData([]);
        }
    }, [crypto, timeframe, comparedCrypto]);

    // Do not render modal content if it's closed or no crypto is selected
    if (!isOpen || !crypto) return null;

    const chartOptions = getChartOptions();

    const series = getSeries(
        crypto,
        chartData,
        comparedCrypto,
        comparisonChartData
    );

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex justify-center items-center z-50">
            <div className="bg-gradient-to-b from-sky-950/50 to-indigo-950/30 p-6 rounded-md w-11/12 max-w-4xl h-5/6 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <img
                            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                            alt={`${crypto.name} logo`}
                            className="w-6 h-6 mr-2"
                        />
                        <h2 className="text-2xl font-bold wrap-break-word bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500 inline-block text-transparent bg-clip-text">
                            {crypto.name} ({crypto.symbol})
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="hover:scale-125 hover:font-bold text-xl cursor-pointer transition duration-100"
                    >
                        ✕
                    </button>
                </div>
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100%-4rem)]">
                    {/* Right section: Time options and Chart */}
                    <div className="md:col-span-2 flex flex-col">
                        {/* Time options */}
                        <div className="flex space-x-2 mb-4">
                            {timeframes.map((tf) => (
                                <button
                                    key={tf}
                                    onClick={() => setTimeframe(tf)}
                                    className={`px-3 py-1 rounded-md text-sm transition duration-400 cursor-pointer ${timeframe === tf
                                        ? "bg-gradient-to-br from-sky-500 to-indigo-500 font-bold animate-pulse brightness-110"
                                        : "border border-sky-800 hover:bg-gradient-to-br from-sky-500/50 to-indigo-500/50"
                                        }`}
                                >
                                    {tf}
                                </button>
                            ))}
                        </div>
                        {/* Chart */}
                        <div className="flex-grow bg-black/30 rounded-md flex items-center justify-center p-4 shadow-md shadow-black">
                            {chartData.length > 0 ||
                                (comparedCrypto && comparisonChartData.length > 0) ? (
                                <Chart
                                    options={chartOptions}
                                    series={series}
                                    type="area"
                                    height="100%"
                                    width="100%"
                                />
                            ) : (
                                <span className="animate-spin">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill="#0EA5E9"
                                            d="M.001 8.025v.003q.003.091.021.177l.011.09l.011.095l.019.128l.045.296l.068.326q.018.087.044.178l.049.188q.012.048.027.097l.031.098l.065.203l.017.052l.019.052l.039.105l.081.215l.094.218l.048.111q.025.055.053.111l.11.224q.06.112.123.224l.063.113q.032.056.068.112l.14.224c.198.295.417.587.66.864q.369.414.792.775c.284.236.582.452.886.642c.306.188.619.349.928.487l.232.095q.057.024.115.046l.115.041c.038.014.151.054.226.078l.224.066q.055.017.109.031l.109.027l.213.052l.207.04l.101.019l.049.009l.049.007l.192.027l.093.013l.091.009l.174.015q.084.009.164.012h.011a1 1 0 0 0 1 .982l.025-.001h.004a1 1 0 0 0 .177-.021l.09-.011l.095-.011l.128-.019l.296-.045l.326-.068q.087-.018.178-.044l.188-.049q.049-.012.097-.027l.098-.031l.203-.065l.052-.017l.052-.019l.105-.039l.215-.081l.218-.094l.111-.048q.055-.025.111-.053l.224-.11q.112-.06.224-.123l.113-.063l.112-.068l.224-.14c.295-.197.587-.417.864-.66q.414-.369.775-.792q.355-.428.642-.886c.188-.306.349-.619.487-.928l.095-.232q.024-.057.046-.115l.04-.115c.013-.038.054-.151.078-.226l.066-.224q.017-.055.031-.109l.027-.109l.052-.213l.04-.207l.019-.101l.009-.049l.007-.05l.027-.192l.013-.093l.009-.091l.015-.174q.009-.084.012-.165l.001-.025a1 1 0 0 0 .996-1l-.001-.025v-.003a1 1 0 0 0-.021-.177l-.011-.09l-.011-.095l-.019-.128l-.045-.296l-.068-.326q-.018-.087-.044-.178l-.049-.188q-.012-.049-.027-.097l-.031-.098l-.065-.203l-.017-.052l-.019-.052l-.039-.105l-.081-.215l-.094-.218l-.048-.111q-.025-.055-.053-.111l-.11-.224q-.06-.112-.123-.224l-.063-.113l-.068-.112l-.14-.224a8 8 0 0 0-.66-.864a8 8 0 0 0-.792-.775a8 8 0 0 0-.886-.642a8 8 0 0 0-.928-.487l-.232-.095q-.057-.024-.115-.046l-.115-.04c-.038-.013-.151-.054-.226-.078l-.224-.066l-.109-.031l-.109-.027l-.213-.052l-.207-.04l-.101-.019l-.049-.009l-.049-.007l-.192-.027l-.093-.013l-.091-.009l-.174-.015Q9.108.983 9.028.98L8.989.979a1 1 0 0 0-.999-.981l-.025.001h-.003a1 1 0 0 0-.177.021l-.09.011L7.6.042l-.128.019l-.296.045l-.326.068q-.087.018-.178.044l-.188.049q-.049.012-.097.027l-.098.031l-.203.065l-.052.017l-.052.019l-.105.039l-.215.081l-.218.094l-.111.048q-.055.025-.111.053l-.224.11q-.112.06-.224.123l-.113.063q-.056.032-.112.068l-.224.14a9 9 0 0 0-.864.66a8 8 0 0 0-.775.792a8 8 0 0 0-.642.886a8 8 0 0 0-.487.928l-.095.232q-.024.057-.046.115l-.04.115c-.013.038-.054.151-.078.226l-.066.224l-.032.109l-.027.109l-.052.213l-.04.207l-.019.101l-.009.049l-.007.05l-.027.192l-.013.093l-.009.091l-.015.174q-.009.084-.012.165l-.001.025A1 1 0 0 0 .002 8l.001.025zm1.148-1.014l.002-.009c.01-.051.026-.102.04-.155l.045-.163l.024-.084l.028-.086l.058-.176l.015-.045l.017-.045l.035-.091l.073-.186l.084-.189l.043-.096l.048-.096l.098-.194l.109-.194l.056-.098q.029-.049.061-.096l.124-.194a7 7 0 0 1 .583-.744q.327-.355.697-.665q.377-.303.776-.547c.268-.159.541-.294.808-.41l.202-.079l.099-.038l.1-.033c.033-.011.131-.045.196-.065l.194-.054q.047-.014.095-.026l.094-.021l.184-.042l.179-.032l.087-.015l.043-.008l.043-.005l.166-.02l.08-.01l.078-.006l.15-.011q.072-.006.142-.008l.256-.006l.2.007l.085.002a11 11 0 0 1 .34.024l.022-.001h.004a1 1 0 0 0 .962-.84l.025.006c.051.01.102.026.155.04l.163.045l.084.024l.086.028l.176.058l.045.015l.045.017l.091.035l.186.073l.189.084l.096.043l.096.048l.194.098c.065.034.129.073.194.109l.098.056q.049.029.096.061l.194.124c.255.176.506.369.744.583q.355.327.665.697q.303.377.547.776c.159.268.294.541.41.808l.079.202l.038.099l.033.1c.011.033.045.131.065.196l.054.194q.014.047.026.095l.021.094l.042.184l.032.179l.015.087l.008.043l.005.043l.02.166l.01.08l.006.078l.011.15q.006.072.008.142l.006.256l-.007.2l-.002.085a11 11 0 0 1-.024.34l.001.022v.004a1 1 0 0 0 .823.959l-.003.014q-.016.076-.04.155l-.045.163l-.024.084l-.028.086l-.058.176l-.015.045l-.017.045l-.035.091l-.073.186l-.084.189l-.043.096l-.048.096l-.098.194q-.053.097-.109.194l-.056.098q-.029.049-.061.096l-.124.194a7 7 0 0 1-.583.744a7 7 0 0 1-.697.665q-.377.303-.776.547a7 7 0 0 1-.808.41l-.202.079l-.099.038l-.1.033c-.033.011-.131.045-.196.065l-.194.054l-.095.026l-.094.021l-.184.042l-.179.032l-.087.015l-.043.008l-.043.005l-.166.02l-.08.01l-.078.006l-.15.011q-.073.006-.142.008l-.256.006l-.2-.007l-.085-.002a11 11 0 0 1-.34-.024l-.022.001H7.96a1 1 0 0 0-.961.834q-.075-.017-.153-.039l-.163-.045l-.084-.024l-.086-.028l-.176-.058l-.045-.015l-.045-.017l-.091-.035l-.186-.073l-.189-.084l-.096-.043l-.096-.048l-.194-.098c-.065-.034-.129-.073-.194-.109l-.098-.056q-.049-.029-.096-.061l-.194-.124a7 7 0 0 1-.744-.583a7 7 0 0 1-.665-.697a7 7 0 0 1-.547-.776a7 7 0 0 1-.41-.808l-.079-.202l-.038-.099l-.033-.1c-.011-.033-.045-.131-.065-.196l-.054-.194q-.014-.047-.026-.095l-.021-.094l-.042-.184l-.032-.179l-.015-.087l-.008-.043l-.005-.043l-.02-.166l-.01-.08l-.006-.078l-.011-.15q-.006-.073-.008-.142l-.006-.256l.007-.2l.002-.085a11 11 0 0 1 .024-.34L2 7.98v-.003a1 1 0 0 0-.851-.964z"
                                        />
                                    </svg>
                                </span>
                            )}
                        </div>
                    </div>
                    {/* Left section: Other cryptos list */}
                    <div className="md:col-span-1 bg-black/30 p-4 rounded-md shadow-md shadow-black">
                        <h3 className="text-xl font-medium mb-2">Compare With:</h3>
                        <input
                            type="text"
                            placeholder="Search cryptocurrency..."
                            className="w-full p-2 rounded-md border border-sky-600 border-x-0 focus:border-sky-500 hover:brightness-110 mb-2 cursor-pointer outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <ul className="text-white/90 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {filteredCryptos.map((c) => (
                                <li
                                    key={c.id}
                                    className="p-2 hover:bg-gradient-to-t from-sky-500/30 to-sky-500/40 transition duration-75 cursor-pointer rounded-md"
                                    onClick={() => {
                                        setComparedCrypto(c);
                                        setSearchTerm(""); // Clear search after selection
                                        setFilteredCryptos([]); // Clear filtered results
                                    }}
                                >
                                    {c.name} ({c.symbol})
                                </li>
                            ))}
                        </ul>
                        {comparedCrypto && (
                            <div className="mt-4 p-3 bg-gradient-to-t from-sky-500/10 to-sky-500/20 rounded-md flex justify-between items-center">
                                <span>
                                    Comparing with: {comparedCrypto.name} ({comparedCrypto.symbol})
                                </span>
                                <button
                                    onClick={() => setComparedCrypto(null)}
                                    className="hover:font-bold ml-2 hover:scale-125 text-sm cursor-pointer transition duration-100"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CryptoDetailModal;
