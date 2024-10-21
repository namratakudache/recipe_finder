import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import { AuthProvider } from "./Components/AuthContext";

import { PrivateRoute, PublicRoute } from "./Components/Routetypes.js";
import LoginComponent from "./Components/Login/LoginComponent.js";

// Lazy load components
const Home = lazy(() => import("./Components/Home/Home.js"));
const Recipes = lazy(() => import("./Components/Recipes"));
const RecipeDetails = lazy(() =>
  import("./Components/RecipeDetails/RecipeDetails.js")
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginComponent />
                </PublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            {/* Private Routes */}
            <Route
              path="/recipes"
              element={
                <PrivateRoute>
                  <Recipes />
                </PrivateRoute>
              }
            />
            <Route
              path="/recipes/:recipeId"
              element={
                <PrivateRoute>
                  <RecipeDetails />
                </PrivateRoute>
              }
            />

            {/* Redirect "/" to home (Public Route) */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Optional Logout Route */}
            <Route path="/logout" element={<Home />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
