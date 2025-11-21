import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Repositories from "./pages/Repositories";
import RepositoryDetails from "./pages/RepositoryDetails";
import FunctionalRequirements from "./pages/FunctionalRequirements";
import ImpactAnalysis from "./pages/ImpactAnalysis";
import UserManagement from "./pages/UserManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/repositories"
            element={
              <ProtectedRoute allowedRoles={['admin', 'developer']}>
                <Repositories />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/repositories/:id"
            element={
              <ProtectedRoute allowedRoles={['admin', 'developer']}>
                <RepositoryDetails />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/functional-requirements"
            element={
              <ProtectedRoute>
                <FunctionalRequirements />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/impact-analysis"
            element={
              <ProtectedRoute>
                <ImpactAnalysis />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
