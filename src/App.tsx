import { lazy, Suspense } from "react";
import "./index.css";

const LogoScene = lazy(() => import("./scenes/LogoScene"));

function App() {
  return (
    <div>
      <Suspense
        fallback={
          <div
            style={{
              minHeight: "100vh",
              width: "100%",
              background: "#000",
            }}
            aria-hidden
          />
        }
      >
        <LogoScene />
      </Suspense>
    </div>
  );
}

export default App;
