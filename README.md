# AI Travel Planner

An intelligent travel planning application that leverages AI to help users plan trips, generate packing lists, discover famous places, and check weather conditions for their destinations.

## Features

- **AI-Powered Packing Lists**: Automatically generate personalized packing lists based on destination weather and trip details
- **Famous Places Discovery**: Explore popular tourist attractions and landmarks at your destination
- **Weather Integration**: Real-time weather data and forecasts for trip planning
- **Trip Management**: Create and manage multiple trips with detailed planning
- **User Authentication**: Secure user accounts with Convex Auth
- **Responsive Design**: Beautiful, mobile-friendly interface with Tailwind CSS

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Convex (serverless backend)
- **AI/ML**: Google GenAI, OpenRouter SDK, Groq SDK
- **Authentication**: Convex Auth
- **State Management**: Zustand
- **APIs**: OpenMeteo (weather), Unsplash (images)
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Data Fetching**: TanStack React Query

## Project Structure

```
src/
├── components/      # Reusable React components
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── routes/         # Router configuration
├── store/          # Zustand state management
├── types/          # TypeScript type definitions
└── utils/          # Utility functions

convex/            # Backend API and database functions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building

Build for production:

```bash
npm run build
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Environment Setup

Make sure to set up your environment variables for:

- Convex API configuration
- AI service credentials (Google GenAI, OpenRouter, Groq)
- Unsplash API key
- Weather API configuration
