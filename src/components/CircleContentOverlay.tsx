import React from "react";
import AboutPane from "./AboutPane";
import ContactPane from "./ContactPane";

const MemoAboutPane = React.memo(AboutPane);
const MemoContactPane = React.memo(ContactPane);

export default function CircleContentOverlay({
  leftInteractive,
  rightInteractive,
}: {
  leftInteractive: boolean;
  rightInteractive: boolean;
}) {
  return (
    <div className="veloste-overlay" aria-hidden={false}>
      <div className="veloste-scroll-indicators" aria-hidden>
        <div className="veloste-scroll-indicator veloste-scroll-indicator--left">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M11 4L6 9L11 14"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>About</span>
        </div>
        <div className="veloste-scroll-indicator veloste-scroll-indicator--right">
          <span>Contact</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M7 4L12 9L7 14"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="veloste-pane veloste-pane--left">
        <MemoAboutPane active={leftInteractive} />
      </div>

      <div className="veloste-pane veloste-pane--right">
        <MemoContactPane active={rightInteractive} stacked />
      </div>
    </div>
  );
}
