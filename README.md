# Resource Modelling Analytics Tool

A comprehensive Next.js application for analyzing and managing resource modeling data with interactive charts and data management capabilities.

## 🚀 Features

- **Interactive Dashboards**: Quarterly and Yearly impact reports with dynamic charts
- **Data Management**: Add, edit, and manage core drivers and resource data
- **Visual Analytics**: Interactive line charts with Recharts library
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Type Safety**: Full TypeScript support with strict type checking
- **Component Architecture**: Reusable components for consistent UI

## 📋 Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resource-modelling
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Dependencies

### Core Dependencies
- **Next.js 15.5.4** - React framework for production
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety and development experience
- **Tailwind CSS 4** - Utility-first CSS framework

### UI & Icons
- **Lucide React 0.544.0** - Beautiful icon library
- **Recharts 3.2.1** - Composable charting library for React

### Utilities
- **clsx 2.1.1** - Utility for constructing className strings

### Development Dependencies
- **ESLint 9** - Code linting and formatting
- **@types/node, @types/react, @types/react-dom** - TypeScript type definitions

## 🏗️ Project Structure

```
resource-modelling/
├── src/
│   ├── app/                          # Next.js app directory
│   │   ├── Components/               # Reusable UI components
│   │   │   ├── CardLink.tsx         # Navigation card component
│   │   │   ├── CommonRecharts.tsx   # Shared chart component
│   │   │   ├── CommonTable.tsx      # Shared table component
│   │   │   ├── CoreDriverActions.tsx # Data management modal
│   │   │   ├── DeviationBadge.tsx   # Deviation indicator component
│   │   │   ├── ManageToolBar.tsx    # Data management toolbar
│   │   │   ├── PageHeader.tsx       # Page header component
│   │   │   ├── QuarterlyImpact.tsx  # Quarterly reports
│   │   │   ├── SidebarLayout.tsx    # Main layout wrapper
│   │   │   ├── TableView.tsx        # Data table component
│   │   │   └── YearlyImpact.tsx     # Yearly reports
│   │   ├── Manage_Data/             # Data management page
│   │   ├── Reports/                 # Reports dashboard
│   │   ├── Settings/                # Settings page
│   │   ├── globals.css              # Global styles
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Home page
│   ├── data/                        # JSON data files
│   │   ├── core-drivers.json        # Core driver data
│   │   ├── header-data.json         # Header configuration
│   │   ├── resource-summary-graph-quarterly.json
│   │   ├── resource-summary-graph-yearly.json
│   │   ├── resource-summary-table-quarterly.json
│   │   └── resource-summary-table-yearly.json
│   ├── hooks/                       # Custom React hooks
│   │   └── useHeaderYears.tsx       # Year calculation hook
│   ├── lib/                         # Utility functions
│   │   ├── cn.ts                    # Class name utility
│   │   └── utils.tsx                # Data processing utilities
│   └── types/                       # TypeScript type definitions
│       └── resource.ts              # Resource data types
├── public/                          # Static assets
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── next.config.ts                   # Next.js configuration
└── eslint.config.mjs                # ESLint configuration
```

## 🎯 Key Features

### 1. Dashboard & Reports
- **Quarterly Impact Reports**: Interactive charts showing quarterly resource trends
- **Yearly Impact Reports**: Annual resource analysis with visual indicators
- **Tabbed Navigation**: Easy switching between different report types

### 2. Data Management
- **Core Driver Management**: Add, edit, and delete core drivers
- **Bulk Operations**: Bulk update capabilities for data management
- **Search & Filter**: Advanced filtering and search functionality

### 3. Interactive Charts
- **Line Charts**: Target vs Actual FTE trends
- **Highlighted Periods**: Visual emphasis on specific quarters/years
- **Responsive Design**: Charts adapt to different screen sizes
- **Custom Tooltips**: Detailed information on hover

### 4. Data Visualization
- **Deviation Badges**: Color-coded percentage deviation indicators
- **Summary Tables**: Comprehensive data tables with calculations
- **Legend System**: Clear visual indicators for chart elements

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Alternative with yarn
yarn dev
yarn build
yarn start
yarn lint
```

## 🎨 Styling & Theming

The application uses **Tailwind CSS v4** with a custom design system:

- **Color Palette**: Emerald green primary, slate grays, pink accents
- **Typography**: Clean, readable font stack
- **Components**: Consistent spacing and border radius
- **Responsive**: Mobile-first responsive design

## 📊 Data Structure

### Core Driver Data
```typescript
type DriverData = {
  id: number;
  core_driver: { name: string; unit_name?: string };
  base_value?: { value?: number };
  quarterly_core_drivers?: { quarter: number; year: number; value: number }[];
  yearly_core_drivers?: { year: number; value: number }[];
}
```

### Report Data
- **Graph Data**: Labels, targets, and actuals arrays
- **Table Data**: Function-based data with target/actual values
- **Filters**: Configuration for time periods and data ranges

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
npm run start
```

## 🔍 Troubleshooting

### Common Issues

1. **TypeScript Errors**
   - Ensure all dependencies are installed: `npm install`
   - Check TypeScript version compatibility

2. **Chart Not Rendering**
   - Verify Recharts is properly installed
   - Check data format matches expected structure

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for conflicting CSS classes

4. **Build Errors**
   - Run `npm run lint` to check for code issues
   - Ensure all imports are correct

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 📞 Support

For technical support or questions, please contact the development team.

---

**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS**

