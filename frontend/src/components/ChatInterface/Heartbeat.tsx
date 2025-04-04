// components/ChatInterface/Heartbeat.tsx
export default function Heartbeat() {
    return (
      <div className="flex justify-center items-center  w-full">
        <svg
          viewBox="0 0 400 100"
          className="w-[400px] h-[100px] animate-heartbeat-glow"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(70, 0)">
            <path
              d="
                M 0 50
                H 80
                C 90 50, 95 25, 100 50
                S 110 85, 120 50
                S 130 5, 140 50
                S 150 75, 160 50
                H 240"
              stroke="#FF0000"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
    );
  }
  