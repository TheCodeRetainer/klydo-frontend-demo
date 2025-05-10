# Klydo Frontend

The frontend application for the Klydo Transaction Indexer, built with Next.js and TypeScript. This application displays Ethereum & Base (Mainnet) transactions for addresses collected from multiple sources.

## Technology Stack

- Next.js with TypeScript
- React 18
- Tailwind CSS for styling

## Project Structure

```
frontend/
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   └── lib/           # Utility functions and API client
├── public/            # Static assets
├── package.json
└── next.config.ts
```

## Features

- Displays combined transaction list for all watched addresses
- Responsive UI built with Tailwind CSS
- Automatic address collection when transactions are requested
- Real-time transaction data from the backend API

## Setup Instructions

### Prerequisites

- Node.js 18 or later
- Backend API running (see backend README)

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env.local` file in the frontend directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Components

- **TransactionTabs**: Main component for displaying transaction data with filtering options
- **TransactionList**: Displays the list of transactions
- **TransactionItem**: Individual transaction display
- **AddressList**: Displays the list of watched addresses

## API Integration

The frontend communicates with the backend API to fetch transaction data. The API client is located in `src/lib/api.ts`.

## Deployment

### Deployment to Vercel

1. Push your code to a Git repository.

2. Connect your repository to Vercel.

3. Configure the environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: URL of your deployed backend API

4. Deploy the project.

## Scripts

- `npm run dev` - Run the development server
- `npm run build` - Build the project
- `npm run start` - Start the production server
- `npm run lint` - Run linting

## License

This project is licensed under the MIT License.
