# PLP Task Manager

A modern task management application built with React, Vite, and Tailwind CSS. This application demonstrates component architecture, state management with hooks, and API integration.

## Features

- 🎨 **Responsive Design** - Works on mobile, tablet, and desktop
- 🌓 **Dark/Light Mode** - Toggle between themes
- 📝 **Task Management** - Add, edit, delete, and mark tasks as complete
- 🔍 **Task Filtering** - Filter tasks by status (All, Active, Completed)
- 📱 **API Integration** - Fetch and display posts from JSONPlaceholder API
- 🛣️ **Client-side Routing** - Built with React Router
- 💾 **Local Storage** - Persist tasks using custom hooks

## Live Demo

[View Live Demo](https://your-deployed-app-url.com) *(Update with your deployment URL)*

## Screenshots

*(Add screenshots of your application here)*

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/plp-task-manager.git
   cd plp-task-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Project Structure

```
src/
├── components/       # Reusable UI components (Button, Card, Navbar, etc.)
├── pages/           # Page components (Home, About, Contact, etc.)
├── hooks/           # Custom React hooks (useLocalStorage, etc.)
├── context/         # React context providers (ThemeContext)
├── api/             # API integration functions
├── utils/           # Utility functions
└── App.jsx          # Main application component with routing
```

## Built With

- [React](https://react.dev/) - JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [React Router](https://reactrouter.com/) - Declarative routing for React
- [Hero Icons](https://heroicons.com/) - Beautiful hand-crafted SVG icons
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Fake Online REST API for Testing

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vite + React + Tailwind CSS Template](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)