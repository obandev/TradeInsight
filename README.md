# TradeInsight

**TradeInsight** is a comprehensive trading analysis and tracking tool built with **Next.js**. Designed for traders, it empowers you to monitor your trades, analyze market trends, and make data-driven decisions.

![Position Size and Profit Calculators](https://github.com/user-attachments/assets/e4e901d6-6be9-4b31-afc6-31aa976308f9)

With integrated **position size** and **profit calculators**, you can quickly assess risk, calculate lot sizes, and project potential gains. Optimized for BTC/USD trading, this tool ensures precision in every trade.

![Trade Input Form](https://github.com/user-attachments/assets/257f8de4-0934-4b0d-bb74-0a70d49af38f)

The interface is designed for traders to log and track each trade in detail. It includes fields for timeframes, entry signals, trends, and key technical indicators (SMA, RSI, Bollinger Bands). 

![Trade History Table](https://github.com/user-attachments/assets/70ce2375-40b8-4aa7-a0bd-7fa8aaa16209)

The **Trade History Table** gives a comprehensive view of all your trades, including profit/loss, trends, and stop loss levels. It allows you to analyze past performance and refine future strategies.

Currently, we're working on integrating **artificial intelligence** to track trades and provide better outcomes and personalized recommendations to enhance your trading strategies.

![AI-Enhanced Trade History](https://github.com/user-attachments/assets/f761da74-de06-4cad-b1d3-1839c6123097)


## Features

- **Trade Tracking**: Log and manage your trades with detailed information.
- **Market Analysis**: Utilize built-in calculators for position sizing and profit calculations.
- **Technical Indicators**: Track key indicators like SMA, RSI, and Bollinger Bands.
- **Image Upload**: Attach charts or screenshots to your trade entries.
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing.
- **Responsive Design**: Access your trading data on any device.

## Technologies Used

- [Next.js 13](https://nextjs.org/) with App Router
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Cloudinary](https://cloudinary.com/) for image storage

## Getting Started

1. **Clone the repository**:
```git clone https://github.com/yourusername/tradeinsight.git cd tradeinsight```
2. **Install dependencies**:
```pnpm install```
3. **Set up environment variables**:
Create a `.env.local` file in the root directory and add your Cloudinary credentials:
```NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name```
```NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset```
4. **Run the development server**:
```pnpm run dev```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Adding a Trade**: Fill in the trade details form and click "Save Trade" to log a new trade.
2. **Viewing Trade History**: Scroll through your past trades in the Trade History table.
3. **Analyzing Trades**: Use the built-in calculators to analyze position sizes and potential profits.
4. **Uploading Images**: Attach charts or screenshots to your trades for visual reference.
5. **Updating Trade Information**: Edit profit/loss and final stop loss information directly in the Trade History table.

## Contributing

We welcome contributions to TradeInsight! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
