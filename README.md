# Project Structure
your-project/
├── node_modules/
├── public/                  # Static assets that don't need processing
│   ├── favicon.ico
│   └── robots.txt
├── src/                     # Source files
│   ├── assets/             # Assets that need processing
│   │   ├── images/
│   │   └── styles/
│   │       └── main.css
│   ├── components/         # Reusable components (if any)
│   │   └── Header.js
│   ├── utils/             # Helper functions
│   │   └── helpers.js
│   ├── main.js            # Entry point
│   └── index.html         # Main HTML file
├── .gitignore
├── package.json
├── package-lock.json      # or pnpm-lock.yaml or yarn.lock
└── vite.config.js         # Vite configuration

# Minimal Structure (if you prefer simpler):
your-project/
├── node_modules/
├── public/
├── src/
│   ├── main.js
│   └── index.html
├── package.json
└── vite.config.js

# Start development server with hot module replacement (HMR)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview