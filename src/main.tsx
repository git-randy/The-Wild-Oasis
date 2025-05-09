import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// Workaround for unknown prop warnings for styled components:
// https://github.com/styled-components/styled-components/issues/4049
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.tsx";

createRoot(document.getElementById("root")!).render(
  <StyleSheetManager shouldForwardProp={isPropValid}>
    <StrictMode>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace("/")}
      >
        <App />
      </ErrorBoundary>
    </StrictMode>
  </StyleSheetManager>
);
