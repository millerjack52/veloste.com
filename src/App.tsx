import { lazy, Suspense } from "react";
import "./index.css";
import useVh from "./hooks/useVH";

const LogoScene = lazy(() => import("./scenes/LogoScene"));

function App() {
  useVh();

  return (
    <>
      <a href="#site-main" className="skip-to-main">
        Skip to main content
      </a>
      <main
        id="site-main"
        style={{
          minHeight: "calc(var(--vh, 1vh) * 100)",
          width: "100%",
        }}
      >
        <Suspense
          fallback={
            <div
              style={{
                minHeight: "calc(var(--vh, 1vh) * 100)",
                width: "100%",
                background: "#000",
              }}
              aria-hidden
            />
          }
        >
          <LogoScene />
        </Suspense>
      </main>
    </>
  );
}

export default App;
