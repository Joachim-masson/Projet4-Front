// Import necessary modules from React and React Router
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import './index.css'
import App from './App.tsx'

/* ************************************************************************* */

// Import the main app component
import Home from "../src/pages/Home.tsx"
import Error404 from "../src/pages/Error404.tsx"
import Characters from './pages/Characters.tsx';
import Locations from './pages/Locations.tsx';
import UserManager from './pages/UserManager.tsx';
import Connexion from "./pages/Connexion.tsx";
import { AuthProvider } from './context/AuthContext.tsx';

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!

const router = createBrowserRouter([
  {
    element: <App />, // Renders the App component for the home page
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
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
        path: "/userManager",
        element: <UserManager />,
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
