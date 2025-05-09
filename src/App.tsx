import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Bookings from "./pages/Bookings";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import { bookingIdParam } from "./features/bookings/constants";
import CheckIn from "./pages/CheckIn";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

function GlobalToaster() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "var(--color-grey-100)",
          color: "var(--color-grey-700)",
        },
      }}
    />
  );
}

function ErrorBoundaryLayout() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <Outlet />
    </ErrorBoundary>
  );
}

const router = createBrowserRouter(
  [
    {
      element: <ErrorBoundaryLayout />,
      children: [
        {
          element: (
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <Navigate replace to="dashboard" />,
            },
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "account",
              element: <Account />,
            },
            {
              path: "cabins",
              element: <Cabins />,
            },
            {
              path: "settings",
              element: <Settings />,
            },
            {
              path: "users",
              element: <Users />,
            },
            {
              path: "bookings",
              element: <Bookings />,
            },
            {
              path: `bookings/:${bookingIdParam}`,
              element: <Booking />,
            },
            {
              path: `checkin/:${bookingIdParam}`,
              element: <CheckIn />,
            },
          ],
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ],
  { future: { v7_relativeSplatPath: true } }
);

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </QueryClientProvider>
      <GlobalToaster />
    </DarkModeProvider>
  );
}

export default App;