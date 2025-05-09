import styled from "styled-components";
import { useGetUser } from "../features/authentication/useGetUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isPending, isAuthenticated } = useGetUser();

  // 2. Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isPending) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // 3. While loading, show a spinner
  if (isPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4. If user is authenticated, render the app
  return <> {isAuthenticated && children}</>;
}
export default ProtectedRoute;
