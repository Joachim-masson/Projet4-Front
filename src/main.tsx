// Import necessary modules from React and React Router
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import './index.css'
import App from './App.tsx'

/* ************************************************************************* */

// Import the main app component
import Accueil from './pages/Accueil.tsx';
import Characters from './pages/Characters.tsx';
import Connexion from "./pages/Connexion.tsx";
import Error404 from "../src/pages/Error404.tsx"
import Home from "../src/pages/Home.tsx"
import Inscription from './components/Inscription.tsx';
import Locations from './pages/Locations.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import UserManager from './pages/UserManager.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!

const router = createBrowserRouter([
  {
    // Cette route est l'entrée principale : pas de Navbar, pas de Footer
    path: "/",
    element: <Accueil />,
    errorElement: <Error404 />,
  },
  {
    element: <App />, // Renders the App component for the home page
    children: [
      {
        path: "/home",
        element: <Home />,
      },
       {
        path: "/characters",
        element: <Characters />,
      },
       {
        path: "/locations",
        element: <Locations />,
      },
      {
        path: "/connexion",
        element: <Connexion/>,
      },
      {
      path: "/inscription",
      element: <Inscription />,
      },
       {
        path: "/userManager",
        element: 
        <ProtectedRoute requiredRole="fullAdmin">
          <UserManager />
        </ProtectedRoute>,
      },]
    }])

    // Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  </AuthProvider>

);
