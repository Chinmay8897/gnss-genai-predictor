# Space Monitor App

A unified React application combining satellite monitoring and AI forecasting capabilities.

## Features

### Homepage (3D Satellite Dashboard)
- **3D Earth Visualization**: Interactive 3D Earth with realistic textures and lighting
- **Satellite Constellation**: Real-time GPS satellite positions with error tracking
- **System Overview**: Live metrics and satellite status distribution
- **Interactive Details**: Hover over satellites to view detailed error information
- **Space Theme**: Immersive space-themed UI with glass morphism effects

### Dashboard (AI Forecasting)
- **Overview Section**: Problem description and solution overview
- **Dataset Analysis**: Multi-constellation GNSS error data visualization
- **ML Models**: LSTM, Transformer, and ensemble model information
- **Results**: Prediction accuracy metrics and performance charts
- **Error Distribution**: Statistical analysis of prediction errors
- **Live Demo**: Interactive demonstration of real-time predictions

## Project Structure

```
src/
├── homepage/           # 3D Satellite Dashboard components
│   ├── components/     # Homepage-specific components
│   └── data/          # Mock satellite data
├── dashboard/         # AI Forecasting Dashboard components
│   └── components/    # Dashboard-specific components
│       └── sections/  # Individual dashboard sections
├── components/
│   ├── shared/        # Shared components (NavigationBar)
│   └── ui/           # Reusable UI components
├── pages/            # Page components (Homepage, Dashboard, NotFound)
├── hooks/            # Custom React hooks
└── lib/              # Utility functions
```

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling with custom space theme
- **Three.js** with React Three Fiber for 3D graphics
- **Framer Motion** for animations
- **React Router** for navigation
- **Radix UI** components with shadcn/ui
- **Recharts** for data visualization

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Navigation

- **Homepage** (`/`): 3D satellite monitoring dashboard
- **Dashboard** (`/dashboard`): AI forecasting interface
- **Navigation**: Fixed top navigation bar for easy switching

## Key Features

### 3D Visualization
- Realistic Earth with day/night textures
- Animated satellite models with detailed geometry
- Interactive camera controls (orbit, zoom, pan)
- Real-time satellite status indicators
- Hover tooltips with detailed information

### AI Dashboard
- Multi-section dashboard with smooth transitions
- Collapsible sidebar navigation
- Responsive design for all screen sizes
- Interactive data tables and charts
- Real-time status indicators

### Design System
- Unified space theme across both applications
- Glass morphism effects and neon accents
- Consistent color palette and typography
- Responsive grid layouts
- Smooth animations and transitions

## Assets

All 3D textures and assets are located in `/public/assets/`:
- Earth day texture (2K resolution)
- Earth night texture (4K resolution)
- Earth normal map
- Various satellite and space-themed assets

## Development Notes

- Both applications maintain their original functionality
- Shared components are unified for consistency
- Navigation allows seamless switching between views
- All dependencies are optimized to avoid duplication
- TypeScript ensures type safety across the application

## Browser Support

- Modern browsers with WebGL support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile responsive design

## License

This project is for demonstration purposes.
