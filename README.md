# Pizza Ordering Frontend

A modern, responsive React frontend for the Django Pizza Ordering API. Built with Vite for fast development and optimal performance.

## Features

- **Pizza Listing**: Browse all available pizzas with ingredients and prices
- **Search Functionality**: Search pizzas by name
- **Pizza Details**: View detailed information including nutritional info
- **Extras Selection**: Add extras to customize your pizza
- **Price Calculator**: Real-time price calculation with quantity and extras
- **Order Placement**: Complete customer form with validation
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Error Handling**: Comprehensive error handling with retry functionality
- **Loading States**: Smooth loading indicators for better UX

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router 6** - Client-side routing
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and dev server
- **Vanilla CSS** - Custom styling with modern CSS features

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.jsx      # Main layout wrapper
│   ├── LoadingSpinner.jsx
│   ├── ErrorMessage.jsx
│   ├── SearchBar.jsx
│   ├── PriceCalculator.jsx
│   └── OrderForm.jsx
├── pages/              # Page components
│   ├── PizzaList.jsx   # Pizza listing page
│   ├── PizzaDetail.jsx # Pizza details and ordering
│   └── NotFound.jsx    # 404 page
├── services/           # API service layer
│   └── api.js         # Axios configuration and API methods
├── App.jsx            # Root component with routing
└── main.jsx           # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Django backend running on `http://localhost:8000`

### Installation

1. **Create the project directory**:

   ```bash
   mkdir usersnackFE
   cd usersnackFE
   ```

2. **Initialize the project**:

   ```bash
   npm init -y
   ```

3. **Install dependencies**:

   ```bash
   npm create vite@latest
   npm install react react-dom react-router-dom axios
   npm install -D @vitejs/plugin-react vite eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh @types/react @types/react-dom
   ```

4. **Create the file structure** and copy all the provided files into their respective locations.

5. **Start the development server**:

   ```bash
   npm run dev
   ```

6. **Open your browser** and navigate to `http://localhost:3000`

## API Integration

The frontend integrates with the Django backend through these main endpoints:

- `GET /api/pizza/` - List all pizzas
- `GET /api/pizza/{id}/` - Get pizza details
- `POST /api/pizza/{id}/calculate_price/` - Calculate order price
- `GET /api/extra/` - List available extras
- `POST /api/order/` - Create new order

## Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Key Features Explained

### 1. Pizza Listing Page (`/`)

- Displays all available pizzas in a responsive grid
- Shows pizza name, price, description, and ingredients
- Includes search functionality
- Direct navigation to pizza details

### 2. Pizza Detail Page (`/pizza/:id`)

- Comprehensive pizza information
- Interactive extras selection with checkboxes
- Quantity selector with +/- buttons
- Real-time price calculation
- Customer information form with validation
- Order placement with success/error handling

### 3. API Service Layer

- Centralized API configuration with Axios
- Request/response interceptors for logging
- Error handling with fallback mechanisms
- Organized service methods for different entities

### 4. Error Handling

- Network error handling with retry options
- Form validation with field-specific error messages
- API error responses with user-friendly messages
- Loading states during API calls

### 5. Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactive elements
- Optimized for various screen sizes

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Vite's fast HMR for development
- Code splitting with React Router
- Optimized bundle size
- Efficient re-rendering with React hooks
- Debounced search functionality

## Future Enhancements

- Add order history page
- Implement user authentication
- Add pizza favorites functionality
- Real-time order tracking
- Payment integration
- Admin panel for pizza management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
