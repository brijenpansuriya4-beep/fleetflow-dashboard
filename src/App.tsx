import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Trips from "./pages/Trips";
import Maintenance from "./pages/Maintenance";
import Expenses from "./pages/Expenses";
import Drivers from "./pages/Drivers";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/vehicles" element={<ProtectedRoute roles={['fleet_manager', 'dispatcher', 'safety_officer']}><Vehicles /></ProtectedRoute>} />
            <Route path="/trips" element={<ProtectedRoute roles={['fleet_manager', 'dispatcher']}><Trips /></ProtectedRoute>} />
            <Route path="/maintenance" element={<ProtectedRoute roles={['fleet_manager', 'dispatcher', 'safety_officer']}><Maintenance /></ProtectedRoute>} />
            <Route path="/expenses" element={<ProtectedRoute roles={['fleet_manager', 'financial_analyst']}><Expenses /></ProtectedRoute>} />
            <Route path="/drivers" element={<ProtectedRoute roles={['fleet_manager', 'dispatcher', 'safety_officer']}><Drivers /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute roles={['fleet_manager', 'financial_analyst']}><Analytics /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
