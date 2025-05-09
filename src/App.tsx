import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate replace to="dashboard" />}
                path="/"
              />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
              <Route path="bookings" element={<Bookings />} />
              <Route
                path={`bookings/:${bookingIdParam}`}
                element={<Booking />}
              />
              <Route
                path={`checkin/:${bookingIdParam}`}
                element={<CheckIn />}
              />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

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
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;

// function ErrorBoundaryLayout() {
//   return (
//     <ErrorBoundary
//       FallbackComponent={ErrorFallback}
//       onReset={() => window.location.replace("/")}
//     >
//       <Outlet />
//     </ErrorBoundary>
//   );
// }

// const router = createBrowserRouter([
//   {
//     element: <ErrorBoundaryLayout />,
//     children: [
//       {
//         element: (
//           <ProtectedRoute>
//             <AppLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           {
//             index: true,
//             element: <Navigate to="/dashboard" replace />,
//           },
//           {
//             path: "dashboard",
//             element: <Dashboard />,
//           },
//           {
//             path: "bookings",
//             element: <Bookings />,
//           },
//           {
//             path: "bookings/:bookingId",
//             element: <Booking />,
//           },
//           {
//             path: "checkin/:bookingId",
//             element: <Checkin />,
//           },
//           {
//             path: "cabins",
//             element: <Cabins />,
//           },
//           {
//             path: "users",
//             element: <Users />,
//           },
//           {
//             path: "settings",
//             element: <Settings />,
//           },
//           {
//             path: "account",
//             element: <Account />,
//           },
//         ],
//       },

//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "*",
//         element: <PageNotFound />,
//       },
//     ],
//   },
// ]);


// Also if your RouterProvider is placed below the GlobalStyles

// <DarkModeProvider>
//       <QueryClientProvider client={queryClient}>
//         <ReactQueryDevtools initialIsOpen={false} />
//         <GlobalStyles />
//         <RouterProvider router={router} />
// then no need to include GlobalStyles again in ErrorFallback component

// function ErrorFallback({ error, resetErrorBoundary }) {
//   return (
//     <>
//       <StyledErrorFallback>
//         <Box>
//           <Heading as="h1">Something went wrong 🧐</Heading>
//           <p>{error.message}</p>
//           <Button $size="large" onClick={resetErrorBoundary}>
//             Try Again
//           </Button>
//         </Box>
//       </StyledErrorFallback>
//     </>
//   );
// }