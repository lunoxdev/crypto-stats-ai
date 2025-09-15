# Crypto Graph

## Description

A web app that displays real‑time crypto data from the CoinMarketCap API with key metrics like price, % changes, market cap, volume, etc.

## Tech Stack

- **Next.js**: React framework for building full-stack web applications.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Axios**: Promise-based HTTP client for making API requests.
- **CoinMarketCap API**: For fetching cryptocurrency data.
- **Biome**: For linting and formatting code.

## Installation

Follow these steps to set up and run the project locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/lunoxdev/crypto-graph.git
    cd crypto-graph
    ```

2.  **Install dependencies using pnpm:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of your project and add your CoinMarketCap API key:

    ```
    CMC_API_KEY=YOUR_COINMARKETCAP_API_KEY
    ```

    Replace `YOUR_COINMARKETCAP_API_KEY` with your actual API key obtained from [CoinMarketCap API Documentation](https://coinmarketcap.com/api/documentation/v1/#section/Quick-Start-Guide).

4.  **Run the development server:**

    ```bash
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
