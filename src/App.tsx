import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./components/ui/Toast";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { AdminLayout } from "./components/layout/AdminLayout";
import { PublicLayout } from "./components/layout/PublicLayout";

// Admin Pages
import { LoginPage } from "./pages/admin/LoginPage";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { ServicesPage } from "./pages/admin/ServicesPage";
import { BookingsPage } from "./pages/admin/BookingsPage";
import { SchedulePage } from "./pages/admin/SchedulePage";
import { SettingsPage } from "./pages/admin/SettingsPage";

// Public Pages
import { HomePage } from "./pages/public/HomePage";
import { BookingPage } from "./pages/public/BookingPage";
import { AutoPartsPage } from "./pages/public/AutoPartsPage";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/auto-parts" element={<AutoPartsPage />} />
              </Route>

              {/* Admin Login (no layout) */}
              <Route path="/admin/login" element={<LoginPage />} />

              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<DashboardPage />} />
                  <Route path="/admin/services" element={<ServicesPage />} />
                  <Route path="/admin/bookings" element={<BookingsPage />} />
                  <Route path="/admin/schedule" element={<SchedulePage />} />
                  <Route path="/admin/settings" element={<SettingsPage />} />
                </Route>
              </Route>

              {/* Fallback */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
